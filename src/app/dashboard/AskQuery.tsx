"use client";
import React, { useState } from "react";
import axios from "axios";
import { useStore } from "@/store/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ThemeToggler from "@/components/ThemeComponnets/ThemeToggler";

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
  const { activeDoc, documents, messages, addMessage, fetchMessages } =
    useStore();

  async function handleQuery(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const documentID = activeDoc?.documentID;
    const formData = new FormData();
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
        console.log("No data was returned");
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
    // <div className="w-full h-full bg-background text-foreground px-4 py-2 relative flex flex-col justify-between">
    //   <header className="w-full bg-card text-card-foreground border border-border flex items-center justify-between p-2 rounded-2xl">
    //     <div className="flex flex-col items-start justify-start gap-2 ml-2">
    //       <div className="text-lg font-semibold">{activeDoc?.source}</div>
    //       <div className="text-sm">{activeDoc?.namespace}</div>
    //     </div>
    //     <div className="flex items-center justify-center">
    //       <ThemeToggler />
    //     </div>
    //   </header>
    //   <main className="w-full h-180 py-2 flex items-center justify-center">
    //     <div className="h-full w-full overflow-y-scroll">
    //       {messages.length === 0 ? (
    //         <div className="w-full h-full flex items-center justify-center">
    //           <h2>No messages to show.</h2>
    //         </div>
    //       ) : (
    //         <div className="w-full h-full flex flex-col gap-4 pt-5">
    //           {messages.map((turn, idx) => {
    //             if (turn.role === "user") {
    //               // user prompts
    //               return (
    //                 <div
    //                   key={idx}
    //                   className="w-full flex justify-end text-right"
    //                 >
    //                   <div className="inline-block rounded-2xl px-4 py-3 bg-primary max-w-2xl shadow-md text-lg text-primary-foreground">
    //                     <div className="whitespace-pre-wrap wrap-break-word">
    //                       {turn.content}
    //                     </div>
    //                   </div>
    //                 </div>
    //               );
    //             }
    //             // agent response
    //             return (
    //               <div
    //                 key={idx}
    //                 className="w-full flex justify-start text-left gap-2"
    //               >
    //                 <div className="w-8 h-8 flex flex-none items-center justify-center rounded-md text-[11px] text-white font-semibold bg-gray-800">
    //                   AI
    //                 </div>
    //                 <div className="flex-1 space-y-3">
    //                   {/* content */}
    //                   <div className="inline-block rounded-2xl px-3 py-2 bg-secondary text-secondary-foreground shadow-sm whitespace-pre-wrap wrap-break-word text-lg">
    //                     {turn.content}
    //                     <div
    //                       className={`px-3 py-2 text-[12px] ${turn?.chunkIDs ? "" : "hidden"}`}
    //                     >
    //                       <div className="text-[11px] font-medium">
    //                         ChunkIds: {JSON.stringify(turn?.chunkIDs)}
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             );
    //           })}
    //         </div>
    //       )}
    //     </div>
    //   </main>
    //   <form
    //     className="w-full px-2 py-4 bg-secondary text-secondary-foreground rounded-2xl align-bottom"
    //     onSubmit={handleQuery}
    //   >
    //     <div className="flex items-center justify-center gap-2">
    //       <Input
    //         type="text"
    //         className="w-full border-2 border-border bg-background text-foreground"
    //         placeholder="Write your query"
    //         onChange={(e) => setQuery(e.target.value)}
    //         value={query}
    //       />
    //       <Button type="submit" className="h-10" disabled={quering}>
    //         Ask
    //       </Button>
    //     </div>
    //   </form>
    // </div>
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

                  {turn.content}

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
