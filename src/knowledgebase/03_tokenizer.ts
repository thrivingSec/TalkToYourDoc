/**
 * Knowledgebase Creation
 * Step 3 - Load chunks(pagecontent, id, metadata->source,_chunkIndex), namespace -> {text, embedding, namespace, source, chunkID}[]
 */

import { NAMESPACE } from "@/lib/fileupload";
import { getEmbeddingModel } from "@/shared/llmModel";
import { Document } from "@langchain/core/documents";

export interface Token {
  namespace:NAMESPACE;
  text:string;
  embedding:number[];
  source:string,
  chunkID:number
}

export async function tokenizer(namespace:NAMESPACE, chunks:Document[]):Promise<Token[]>{
  if(!chunks.length){
    throw new Error('No chunks to embed!')
  }
  if(!namespace){
    namespace = "product_manual"
  }

  const tokensPromise = await Promise.allSettled(
    chunks.map(async (chunk, index) => {
      const text = chunk.pageContent;
      const vector = await getEmbeddingModel().embedQuery(text);
      const source = chunk.metadata.source ?? "unkown_source";
      const chunkID = index++;
      return {
        text,
        embedding:vector,
        namespace,
        source,
        chunkID
      }
    })
  )

  const tokens = tokensPromise.filter(
    tokensResults => tokensResults.status === 'fulfilled'
  ).map(x => x.value)

  return tokens
}