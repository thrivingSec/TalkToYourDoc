
import { Document } from "@langchain/core/documents";
import { readFile } from "fs/promises";
import { extractPdfText } from "@/lib/pdfParser";
import { NAMESPACE } from "@/lib/fileupload";

type SupportedMime =
  | "application/pdf"
  | "text/markdown"
  | "text/plain";

interface LoadFileArg {
  extractedText:string;
  namespace:NAMESPACE
  originalName: string;
}

function getExt(name: string): string {
  const index = name.lastIndexOf(".");
  return index === -1 ? "" : name.slice(index + 1).toLowerCase();
}

// // Load PDF using pdf-parse v2
// async function loadPdf(
//   filePath: string,
//   source: string
// ): Promise<Document[]> {
//   const buffer = await readFile(filePath);

//   // const parser = new PDFParse({ data: buffer });

//   // const result = await parser.getText();

//   // await parser.destroy();
//   const result = await extractPdfText(buffer)
//   // Split by PDF page break
//   // const pages = result.text.split("\f");
//   const pages = result.split("\f")
//   return pages
//     .map((page, index) => page.trim())
//     .filter(Boolean)
//     .map(
//       (pageContent, index) =>
//         new Document({
//           pageContent,
//           metadata: {
//             source,
//             type: "pdf",
//             page: index + 1,
//           },
//         })
//     );
// }

// // Load plain text or markdown
// async function loadText(
//   filePath: string,
//   source: string,
//   type: "text" | "markdown"
// ): Promise<Document[]> {
//   const text = await readFile(filePath, "utf-8");

//   return [
//     new Document({
//       pageContent: text,
//       metadata: {
//         source,
//         type,
//       },
//     }),
//   ];
// }

export async function loadFileAsDocuments(
  args: LoadFileArg
): Promise<Document[]> {
  const { extractedText, namespace, originalName } = args;
  const extension = getExt(originalName);

return [
    new Document({
      pageContent: extractedText,
      metadata: {
        source:originalName,
        namespace:namespace
      },
    }),
  ];

  return [];
}