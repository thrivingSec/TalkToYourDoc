"use client";
import { useStore } from "@/store/store";
import React, { useEffect } from "react";

const RenderDocs = () => {
  const {
    documents,
    isDocsLoading,
    fetchDocuments,
    setActiveDoc,
    activeDoc,
    fetchMessages,
  } = useStore();

  useEffect(() => {
    // calling api to retireve loaded documents
    fetchDocuments();
  }, [fetchDocuments]);

  async function handleDocClick(document: {
    documentID: string;
    source: string;
    namespace: string;
  }) {
    setActiveDoc(document);
    await fetchMessages();
  }

  if (isDocsLoading) {
    return <div>Loading Ingested Docs.</div>;
  }
  if (documents.length === 0) {
    return <div>No Ingested Docs Yet.</div>;
  }
  return (

    <div className="flex flex-col gap-3 p-4">

      {documents.map((doc) => {

        const isActive = activeDoc?.documentID === doc.documentID;

        return (
          <div
            key={doc.documentID}
            onClick={() =>
              handleDocClick({
                documentID: doc.documentID,
                source: doc.source,
                namespace: doc.namespace,
              })
            }

            className={`cursor-pointer rounded-xl border px-4 py-3 transition-all duration-200

              ${isActive
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background hover:bg-accent border-border"
              }
            `}
          >

            <div className="font-medium text-sm truncate">
              {doc.source}
            </div>

            <div className="text-xs opacity-70 mt-1">
              {doc.namespace}
            </div>

          </div>
        );

      })}

    </div>
  );
};

export default RenderDocs;

