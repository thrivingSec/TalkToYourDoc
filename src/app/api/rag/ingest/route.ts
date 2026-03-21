export const runtime = "nodejs";
import { loadFileAsDocuments } from "@/knowledgebase/01_loader";
import { splitter } from "@/knowledgebase/02_splitter";
import { tokenizer } from "@/knowledgebase/03_tokenizer";
import { ingestTokens } from "@/knowledgebase/04_ingestion";
import { UploadFile } from "@/lib/fileupload";
import { Documents, IDOCUMENT } from "@/models/document.model";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/shared/db";

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
  const { extractedText, namespace, fileName } = await UploadFile(request);
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

    // load the document using the loadFileDocument loader
    const loadDoc = await loadFileAsDocuments({
      extractedText,
      namespace,
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
