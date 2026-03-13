"use client"
import React, { useState } from "react";
import UploadDoc from "./UploadDoc";
import AskQuery from "./AskQuery";
import RenderDocs from "./RenderDocs";

const Dashboard = () => {

  const [tab, setTab] = useState<"chat" | "docs" | "upload">("chat");

  return (
    <div className="min-h-screen w-full bg-background text-foreground">

      <div className="mx-auto max-w-375 px-4 py-4">

        {/* MOBILE TABS */}
        <div className="lg:hidden flex gap-2 mb-4">

          <button
            onClick={() => setTab("chat")}
            className={`px-4 py-2 rounded-lg text-sm
              ${tab === "chat" ? "bg-primary text-primary-foreground" : "bg-secondary"}
            `}
          >
            Chat
          </button>

          <button
            onClick={() => setTab("docs")}
            className={`px-4 py-2 rounded-lg text-sm
              ${tab === "docs" ? "bg-primary text-primary-foreground" : "bg-secondary"}
            `}
          >
            Docs
          </button>

          <button
            onClick={() => setTab("upload")}
            className={`px-4 py-2 rounded-lg text-sm
              ${tab === "upload" ? "bg-primary text-primary-foreground" : "bg-secondary"}
            `}
          >
            Upload
          </button>

        </div>


        {/* MOBILE CONTENT */}
        <div className="lg:hidden h-[85vh] rounded-2xl border border-border overflow-hidden">

          {tab === "chat" && <AskQuery />}
          {tab === "docs" && <RenderDocs />}
          {tab === "upload" && <UploadDoc />}

        </div>


        {/* DESKTOP GRID */}
        <div className="hidden lg:grid grid-cols-[300px_1fr_340px] gap-6 h-[calc(100vh-3rem)]">

          {/* DOCS SIDEBAR */}
          <aside className="flex flex-col rounded-2xl border border-border bg-card shadow-sm overflow-hidden">

            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-lg font-semibold">Documents</h2>
            </div>

            <div className="flex-1 overflow-y-auto">
              <RenderDocs />
            </div>

          </aside>


          {/* CHAT */}
          <main className="flex flex-col rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
            <AskQuery />
          </main>


          {/* UPLOAD */}
          <aside className="flex flex-col rounded-2xl border border-border bg-card shadow-sm overflow-hidden">

            <div className="px-6 py-4 border-b border-border">
              <h2 className="text-lg font-semibold">Upload Document</h2>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <UploadDoc />
            </div>

          </aside>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;