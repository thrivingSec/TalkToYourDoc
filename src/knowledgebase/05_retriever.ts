import { NAMESPACE } from "@/lib/fileupload";
import { Chunk } from "@/models/chunks.model";
import { connectDB } from "@/shared/db";
import { getEmbeddingModel } from "@/shared/llmModel";
import mongoose from "mongoose";

/**
 * Knowledgebase Creation
 * Step 4 - {query, docID, userID(retrived from middleware, available in the controller)} -> query
 * embedding, run vector search from userID and docID.
 * This funtionality is used by the agent to retrieve related chunks via vectorsearch
 */
export interface context {
  text:string;
  namespace:NAMESPACE;
  source:string;
  chunkID:number
}
export async function retrieve(args:{query:string, docID:string, userID:string}):Promise<context[]>{
  const {query, docID, userID} = args;
  if(!query || !docID || !userID || query.length < 10){
    throw new Error('All fields are required!')
  }
  

  const queryEmbedding = await getEmbeddingModel().embedQuery(query);

  await connectDB();

  try {
    const results = await Chunk.aggregate([
      {
        $vectorSearch:{
          index:"vector_index",
          path:"embedding",
          queryVector:queryEmbedding,
          numCandidates:50,
          limit:5,
          filter:{
            userID:new mongoose.Types.ObjectId(userID),
            docID:new mongoose.Types.ObjectId(docID)
          }
        }
      }
    ])
    const finalresult = results.map((result, index) => {
      const text = result.text as string ?? "no text content"
      const namespace = result.namespace as NAMESPACE ?? "product_manual"
      const source = result.source as string ?? "no source found"
      const chunkID = result.chunkID as number ?? 0
      return {
        text,
        namespace,
        source,
        chunkID
      }
    })
    return finalresult
  } catch (error) {
    console.log('Error in retrieving :: ', error);
    throw error
  }
}