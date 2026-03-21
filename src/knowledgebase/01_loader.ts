import { Document } from "@langchain/core/documents";
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