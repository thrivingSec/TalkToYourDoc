
import { Document } from "@langchain/core/documents";
import { readFile } from "fs/promises";
import { PDFParse } from "pdf-parse";

type SupportedMime =
  | "application/pdf"
  | "text/markdown"
  | "text/plain";

interface LoadFileArg {
  filePath: string;
  mimeType: SupportedMime;
  originalName: string;
}

function getExt(name: string): string {
  const index = name.lastIndexOf(".");
  return index === -1 ? "" : name.slice(index + 1).toLowerCase();
}

// Load PDF using pdf-parse v2
async function loadPdf(
  filePath: string,
  source: string
): Promise<Document[]> {
  const buffer = await readFile(filePath);

  const parser = new PDFParse({ data: buffer });

  const result = await parser.getText();

  await parser.destroy();

  // Split by PDF page break
  const pages = result.text.split("\f");

  return pages
    .map((page, index) => page.trim())
    .filter(Boolean)
    .map(
      (pageContent, index) =>
        new Document({
          pageContent,
          metadata: {
            source,
            type: "pdf",
            page: index + 1,
          },
        })
    );
}

// Load plain text or markdown
async function loadText(
  filePath: string,
  source: string,
  type: "text" | "markdown"
): Promise<Document[]> {
  const text = await readFile(filePath, "utf-8");

  return [
    new Document({
      pageContent: text,
      metadata: {
        source,
        type,
      },
    }),
  ];
}

export async function loadFileAsDocuments(
  args: LoadFileArg
): Promise<Document[]> {
  const { filePath, mimeType, originalName } = args;
  const extension = getExt(originalName);

  const isMarkdown =
    mimeType === "text/markdown" ||
    extension === "md" ||
    extension === "markdown";

  const isPdf =
    mimeType === "application/pdf" ||
    extension === "pdf";

  const isText =
    mimeType === "text/plain" ||
    extension === "txt";

  if (isPdf) {
    return loadPdf(filePath, originalName);
  }

  if (isText) {
    return loadText(filePath, originalName, "text");
  }

  if (isMarkdown) {
    return loadText(filePath, originalName, "markdown");
  }

  return [];
}