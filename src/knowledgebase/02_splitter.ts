/**
 * Knowledgebase Creation
 * Step 2 - Load Document[] -> Document[](chunks)
 */
import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const DEFAULT_CHUNK_SIZE = 800;
const DEFAULT_CHUNK_OVERLAP = 150;

const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: DEFAULT_CHUNK_SIZE,
  chunkOverlap: DEFAULT_CHUNK_OVERLAP,
});

export async function splitter(docs: Document[]): Promise<Document[]> {
  if (!docs || docs.length === 0) {
    return [];
  }

  const chunks = await textSplitter.splitDocuments(docs);
  return chunks.map((chunk, index) => {
    const base = chunk?.metadata ?? {};
    return new Document({
      pageContent: chunk.pageContent.trim(),
      metadata: {
        ...base,
        source: base?.source ?? "unknown_source",
        _chunkIndex: index,
      },
    });
  });
}
