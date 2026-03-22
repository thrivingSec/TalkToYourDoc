"use client";
import React, { useState } from "react";
import axios from "axios";
import { useStore } from "@/store/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ThemeToggler from "@/components/ThemeComponnets/ThemeToggler";
import ReactMarkdown from  "react-markdown";
import toast from "react-hot-toast";

interface QUERYRES {
  success: boolean;
  message: string;
  data: {
    query: string;
    answer: string;
    citation: {
      chunkIDs: number[];
      namespace: string;
      source: string;
    };
  };
}

const AskQuery = () => {
  const [query, setQuery] = useState("");
  const [quering, setQuering] = useState(false);
  const { activeDoc, messages, addMessage } =
    useStore();

  async function handleQuery(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const documentID = activeDoc?.documentID;
    if (!documentID) return;
    if (!query || query.length < 5) return;
    const data = { query, documentID };
    addMessage({ role: "user", content: `${query}` });
    setQuering(true);
    try {
      const response = await axios.post<QUERYRES>(
        "http://localhost:3000/api/rag/query",
        data,
        { withCredentials: true },
      );
      if (!response.data) {
        toast.error("No response was generated!")
        return;
      }
      const rawData = response.data.data;
      addMessage({
        role: "agent",
        content: rawData.answer,
        chunkIDs: rawData.citation.chunkIDs,
      });
    } catch (error) {
      console.log("Error in query handling :: ", error);
    } finally {
      setQuering(false);
      setQuery("");
    }
  }
  return (
     <div className="flex flex-col h-full">

      {/* HEADER */}
      <header className="border-b border-border px-6 py-4 flex items-center justify-between bg-card">

        <div>

          <div className="font-semibold text-lg">
            {activeDoc?.source || "Select a document"}
          </div>

          <div className="text-sm text-muted-foreground">
            {activeDoc?.namespace}
          </div>

        </div>

        <ThemeToggler />

      </header>


      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">

        {messages.length === 0 ? (

          <div className="h-full flex items-center justify-center text-muted-foreground">
            Start asking questions about your document
          </div>

        ) : (

          messages.map((turn, idx) => {

            if (turn.role === "user") {

              return (
                <div key={idx} className="flex justify-end">

                  <div className="bg-primary text-primary-foreground rounded-xl px-4 py-3 max-w-xl shadow-sm">
                    {turn.content}
                  </div>

                </div>
              );
            }

            return (
              <div key={idx} className="flex gap-3">

                <div className="w-8 h-8 rounded-md bg-black text-white text-xs flex items-center justify-center font-semibold">
                  AI
                </div>

                <div className="bg-secondary text-secondary-foreground rounded-xl px-4 py-3 shadow-sm max-w-xl">

                  <ReactMarkdown>
                    {turn.content}
                  </ReactMarkdown>

                  {turn.chunkIDs && (
                    <div className="text-xs mt-3 opacity-70">
                      ChunkIDs: {JSON.stringify(turn.chunkIDs)}
                    </div>
                  )}

                </div>

              </div>
            );
          })
        )}

      </div>


      {/* INPUT */}
      <form
        onSubmit={handleQuery}
        className="border-t border-border p-4 bg-card"
      >

        <div className="flex gap-3">

          <Input
            placeholder="Ask something about the document..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <Button
            type="submit"
            disabled={quering}
          >
            Ask
          </Button>

        </div>

      </form>

    </div>
  );
};

export default AskQuery;
