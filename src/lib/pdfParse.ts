import "@ungap/with-resolvers";
if (typeof global.DOMMatrix === "undefined") {
  global.DOMMatrix = class {
    constructor() {}
  } as any;
}
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf.mjs";

GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.mjs",
  import.meta.url
).toString();

export async function extractPdfText(buffer: Buffer) {
  const loadingTask = getDocument({
    data: new Uint8Array(buffer),

    // Prevent font loading warnings
    disableFontFace: true,
  });

  const pdf = await loadingTask.promise;

  let text = "";

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    const pageText = content.items
      .map((item: any) => ("str" in item ? item.str : ""))
      .join(" ");

    text += pageText + "\f";
  }

  return text;
}