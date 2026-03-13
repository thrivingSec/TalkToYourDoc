import {Annotation, END, START, StateGraph} from '@langchain/langgraph';
import { retireverNode } from './nodes/01_retrieverNode';
import { queryMoeldNode } from './nodes/02_queryModelNode';
import { finalizeNode } from './nodes/03_finalizeNode';
import { makeInitialState, STATE } from './state';

const stateAnn = Annotation.Root({
  query: Annotation<string>,
  userID:Annotation<string>,
  docID:Annotation<string>,
  contexts:Annotation<Array<{text:string, chunkID:number, namespace:string, source:string}> | undefined>,
  answer:Annotation<string | undefined>,
  chunkIDs:Annotation<Array<number> | undefined>
})


/**
 * chain => START -> retireverNode -> queryModelNode -> end
 */

const builder = new StateGraph(stateAnn)
  .addNode("retrieve", retireverNode)
  .addNode("queryModel", queryMoeldNode)
  .addNode("finalize", finalizeNode)

  builder
  .addEdge(START, "retrieve")
  .addEdge("retrieve", "queryModel")
  .addEdge("queryModel", "finalize")
  .addEdge("finalize", END)


// the graph
const graph = await builder.compile()

export async function initializeGraph(input:{query:string, userID:string, docID:string}):Promise<STATE>{
  const result = await graph.invoke(makeInitialState(input))
  return result
}