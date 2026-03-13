/**
 * Bring the model -> provide it with system prompt + query + context -> get answer + chunkIDs
 */

import { getChatModel } from "@/shared/llmModel";
import { STATE } from "../state";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { connectDB } from "@/shared/db";
import { IMESSAGE, Message } from "@/models/message.model";
import { dynamicPrompt } from "../dynamicPrompt";
import { Documents, IDOCUMENT } from "@/models/document.model";
import { NAMESPACE } from "@/lib/fileupload";

// json parsing
function parseJson(input: string) {
  const start = input.indexOf("{");
  const end = input.indexOf("}");
  if (start === -1 || end === -1 || end < start) {
    return {};
  }
  try {
    return JSON.parse(input.slice(start, end + 1));
  } catch (error) {
    return {};
  }
}

async function fetchLastMessage(
  userID: string,
  docID: string,
  limit: number = 4,
) {
  try {
    // get databse connection
    await connectDB();
    // fetch last messages
    const rawMessages = await Message.find<IMESSAGE>({ userID, docID })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
    // create required message structure
    const messages = rawMessages.map((message) => {
      return {
        role:message.role,
        content:message.content
      }
    })
    return messages
  } catch (error) {
    throw error
  }
}

async function getNameSpace(docID:string):Promise<NAMESPACE>{
  try {
    // get database connection
    await connectDB();
    const document = await Documents.findById<IDOCUMENT>(docID);
    if(!document){
      throw new Error('No relevant document found.') 
    }
    return document.namespace as NAMESPACE ?? "product_manual";
  } catch (error) {
    throw error
  }
}

export async function queryMoeldNode(state: STATE): Promise<Partial<STATE>> {
  const model = getChatModel();
  const messages = await fetchLastMessage(state.userID, state.docID)
  const namespace = await getNameSpace(state.docID);
  const response = await model.invoke([
    new SystemMessage(dynamicPrompt(namespace)),
    new HumanMessage(
      [
        `query: ${state.query}`,
        `context: ${JSON.stringify(state.contexts)}`,
        `pastConversation: ${JSON.stringify(messages)}`
      ].join("\n"),
    ),
  ]);
  const modelRes =
    typeof response.content === "string"
      ? response.content
      : String(response.content);
  const jsonRes = parseJson(modelRes);
  return {
    answer: (jsonRes?.answer ?? "Something went wrong").trim(),
    chunkIDs: jsonRes?.chunkIDs ?? [],
  };
}
