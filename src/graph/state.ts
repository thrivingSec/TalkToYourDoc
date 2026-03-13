/**
 * LangGraph:  START -> node 1 -> node 2 -> END
 * node 1: retireval -> input -> {query + userID + docID} -> output -> {text, chunkID, namspace, source}[]
 * node 2: callModel -> input -> {context, query} -> output -> {answer, chunkIDs}
 * 
 * STATE - {
 * query:string,
 * userID:string,
 * docID:string,
 * contexts:{text:string, chunkID:number, namespace:string, source:string}[]
 * answer:string,
 * chunkIDs:number[]
 * }
 */
import {z} from 'zod'

const CONTEXT = z.object({
  text:z.string(),
  chunkID:z.number(),
  namespace:z.string(),
  source:z.string()
})

export const StateSchema = z.object({
  query:z.string().min(5, "Valid query is required."),
  userID:z.string(),
  docID:z.string(),
  contexts:z.array(CONTEXT).max(5).optional(),
  answer:z.string().optional(),
  chunkIDs:z.array(z.number()).max(5).optional(),
  message:z.string().optional()
})

export type STATE = z.infer<typeof StateSchema>;

// State access point for the graph
export function makeInitialState(arg:{query:string, userID:string, docID:string}):STATE{
  return {
    query:arg.query,
    userID:arg.userID,
    docID:arg.docID
  }
}




