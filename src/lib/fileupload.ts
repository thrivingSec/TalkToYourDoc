import { NextRequest } from "next/server";
import "pdf-parse/worker";
import { PDFParse } from "pdf-parse";

export type NAMESPACE =
  | "technical"
  | "engineering"
  | "architectural"
  | "compliance"
  | "legal"
  | "internal_policies"
  | "refund_policy"
  | "product_manual"
  | "report"
  | "proposal"
  | "essay"
  | "philosophy"
  | "story"
  | "medical_doc"
  | "academic_paper";

type SupportedMime = "application/pdf" | "text/markdown" | "text/plain";

// extract file type
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

export async function UploadFile(
  request: NextRequest,
): Promise<{ extractedText: string; fileName:string; namespace: NAMESPACE }> {
  try {
    // extracting data from the request.formData()
    const data = await request.formData();

    // extracting file from the request
    const file = data.get("file") as File;
    const namespace = data.get("namespace") as NAMESPACE;
    if (!file) {
      throw new Error("Error from UploadFile :: File is missing.");
    }

    // Convert the file to a "Buffer" (a format the server understands)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    let textData = "";

    // using file name tract file type
    const mime = extractMime(file.name);
    if (mime === "application/pdf" || file.name.endsWith(".pdf")) {
      const parser = new PDFParse({ data: buffer });
      const text = await parser.getText();
      text.pages.forEach((obj, index) => {
        textData += obj.text
      })
    } else if (
      mime === "text/markdown" ||
      mime === "text/plain" ||
      file.name.endsWith(".txt") ||
      file.name.endsWith(".md")
    ) {
      textData = buffer.toString("utf-8");
    } else {
      throw new Error("Unspported file type!");
    }

    return { extractedText:textData, fileName:file.name, namespace };
  } catch (error) {
    throw error;
  }
}
