/**
 * Knowledgebase Creation
 * Step 4 - tokens -> {text, embedding, namespace, source, chunkID}[], userID, docID -> put it in
 * the vector db
 * Multiple async databse operations.
 */

import { connectDB } from "@/shared/db";
import { Token } from "./03_tokenizer";
import { Chunk } from "@/models/chunks.model";

interface IngestionResponse {
  status: string;
  chunkCount: number;
  nameSpace: string;
  source: string;
  docID:string
}

export async function ingestTokens(
  tokens: Token[],
  userID: string,
  docID: string,
): Promise<IngestionResponse> {
  if (!tokens) {
    throw new Error("No vectors to emebd.");
  }
  await connectDB();
  let chunkId = 0;
  for (const token of tokens) {
    try {
      await Chunk.create({
        userID,
        docID,
        text: token.text,
        embedding: token.embedding,
        namespace: token.namespace,
        source: token.source,
        chunkID: chunkId++,
      });
    } catch (error) {
      console.log("Error while ingesting to the vector db :: ", error);
      throw error;
    }
  }
  return {
    status: "ok",
    chunkCount: chunkId,
    nameSpace: tokens[0].namespace,
    source: tokens[0].source,
    docID
  };
}
