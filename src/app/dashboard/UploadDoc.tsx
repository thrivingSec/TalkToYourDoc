"use client";
import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import toast from "react-hot-toast";

interface INGESTRES {
  success: boolean;
  message: string;
  data?: {
    chunkCount: number;
    namesapce: string;
    source: string;
    documentID: string;
  };
}

const UploadDoc = () => {
  const [namespace, setNamespace] = useState<string>("");
  const [file, setFile] = useState<File | null>();
  const [ingesting, setIngesting] = useState(false);
  const [result, setResult] = useState("");
  const { addDocument } = useStore();

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
    }
  }
  async function handleFileUpload(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file || !namespace) return;
    const formData = new FormData();
    formData.append("namespace", namespace);
    formData.append("file", file);
    setIngesting(true);
    try {
      const response = await axios.post<INGESTRES>(
        "http://localhost:3000/api/rag/ingest",
        formData,
        { withCredentials: true },
      );
      const rawData = response.data?.data;
      if (!rawData) {
        setResult("No data received from ingestion");
        return;
      }
      setResult(JSON.stringify(rawData));
      toast.success(result);
      addDocument({
        documentID: rawData.documentID,
        source: rawData.source,
        namespace: rawData.namesapce,
      });
    } catch (error) {
      // Set error in result
      console.log("Error in documnet reponse :: ", error);
      setResult("Error in document ingestion, please try again")
    } finally {
      setIngesting(false);
    }
  }
  return (
    <form
      onSubmit={handleFileUpload}
      className="flex flex-col gap-5"
    >

      <Input
        type="text"
        placeholder="Namespace"
        required
        value={namespace}
        onChange={(e) => setNamespace(e.target.value)}
      />

      <Input
        type="file"
        onChange={handleFile}
      />

      <Button
        type="submit"
        disabled={ingesting}
        className="w-full"
      >
        {ingesting ? "Uploading..." : "Ingest Document"}
      </Button>

    </form>

  );
};

export default UploadDoc;
