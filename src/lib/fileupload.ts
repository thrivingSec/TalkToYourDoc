import { NextRequest } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export type NAMESPACE = 
| "technical"
| "engineering"
| "architectural"
| "compliance"
| "legal"
| "internal_policies"
| "refund_policy"
| "product_manual"
| "report"
| "proposal"
| "essay"
| "philosophy"
| "story"
| "medical_doc"
| "academic_paper"

export async function UploadFile(
  request: NextRequest,
): Promise<{ filePath: string; fileName: string, namespace:NAMESPACE }> {
  try {
    // extracting data from the request.formData()
    const data = await request.formData();
    // extracting file from the request
    const file = data.get("file") as File;
    const namespace = data.get('namespace') as NAMESPACE;
    if (!file) {
      throw new Error("Error from UploadFile :: File is missing.");
    }

    // Convert the file to a "Buffer" (a format the server understands)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save it to the "public" folder
    const filePath = `./public/${file.name}`;
    await writeFile(filePath, buffer);

    return { filePath, fileName: file.name, namespace };
  } catch (error) {
    throw error
  }
}
