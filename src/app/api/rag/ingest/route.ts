export const runtime = "nodejs";
import { loadFileAsDocuments } from "@/knowledgebase/01_loader";
import { splitter } from "@/knowledgebase/02_splitter";
import { tokenizer } from "@/knowledgebase/03_tokenizer";
import { ingestTokens } from "@/knowledgebase/04_ingestion";
import { UploadFile } from "@/lib/fileupload";
import { Documents, IDOCUMENT } from "@/models/document.model";
import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import { connectDB } from "@/shared/db";

// extract mime type

type SupportedMime = "application/pdf" | "text/markdown" | "text/plain";

function extractMime(name: string): SupportedMime {
  const index = name.trim().lastIndexOf(".");
  const extension = name.slice(index + 1).toLowerCase();
  switch (extension) {
    case "pdf":
      return "application/pdf";
    case "txt":
    default:
      return "text/plain";
    case "md":
      return "text/markdown";
  }
}

// /api/rag/ingest -> userID, formData -> namespace, file
export async function POST(request: NextRequest) {
  const requestHeaders = request.headers;
  const userID = requestHeaders.get("x-user-id");
  if (!userID) {
    return NextResponse.json(
      { success: false, message: "Invalid request - missing user indetity" },
      { status: 400 },
    );
  }
  const { filePath, fileName, namespace } = await UploadFile(request);
  let documentID: string = "";
  try {
    // get databse connection
    await connectDB();

    // creating the document instance
    const document = await Documents.create({
      userID,
      source: fileName,
      namespace,
    });

    // extracting the documnet id
    documentID = document._id as string;

    // extracting mime type from the fileName
    const mime = extractMime(fileName);

    // load the document using the loadFileDocument loader
    const loadDoc = await loadFileAsDocuments({
      filePath,
      mimeType: mime,
      originalName: fileName,
    });

    // split the dcoumnets into chunks
    const chunks = await splitter(loadDoc);

    // create vectors from the chunks -> tokenizer
    const tokens = await tokenizer(namespace, chunks);

    // ingest tokens into vector db
    const { status, chunkCount, source, docID } = await ingestTokens(
      tokens,
      userID,
      documentID,
    );

    // remove the saved file
    await unlink(filePath);

    return NextResponse.json(
      {
        success: true,
        message: "Documnet ingested",
        data: {
          chunkCount,
          namespace,
          source,
          documentID: docID,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    if (filePath) {
      await unlink(filePath);
    }
    if (documentID.length > 0) {
      // get databse connection
      await connectDB();
      // delete document from the databse if exists
      await Documents.findByIdAndDelete(documentID);
    }
    console.log("Error in ingestion api :: ", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong :: document not ingested",
    });
  }
}
