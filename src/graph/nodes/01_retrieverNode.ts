/**
 * Call the retireve function of knowledgebase and extract the relevant context.
 * This function requires state access with query, userID, docID
 */

import { retrieve } from "@/knowledgebase/05_retriever";
import { STATE } from "../state";

export async function retireverNode(state: STATE): Promise<Partial<STATE>> {
  const extContext = await retrieve({
    query: state.query,
    userID: state.userID,
    docID: state.docID,
  });

  // TODO: handle for empty extContext
  return {
    contexts:extContext
  }
}
