import { ChatGoogle } from "@langchain/google";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { env } from "./env";

export const getChatModel = () => {
  return new ChatGoogle({
    model: env.GOOGLE_MODEL,
    apiKey: env.GOOGLE_API_KEY,
    temperature: 0.2,
  });
};

export const getEmbeddingModel = () => {
  return new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001",
    apiKey: env.GOOGLE_API_KEY,
    taskType: TaskType.RETRIEVAL_DOCUMENT,
  });
};
