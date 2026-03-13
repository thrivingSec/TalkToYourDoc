import { Documents, IDOCUMENT } from "@/models/document.model";
import { connectDB } from "@/shared/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const requestHeaders = request.headers;
    const userID = requestHeaders.get("x-user-id");
    if (!userID) {
      return NextResponse.json(
        { success: false, message: "Invalid request - missing user indetity" },
        { status: 400 },
      );
    }
    // get databse connection
    await connectDB();
    // fetch documents
    const rawDocuments = await Documents.find<IDOCUMENT>({ userID });
    if (!rawDocuments) {
      return NextResponse.json(
        {
          success: false,
          message: "No docs yet.",
          data:[]
        },
        { status: 200 },
      );
    }
    const documents = rawDocuments.map((document) => {
      return {
        documentID:document._id,
        source:document.source,
        namespace:document.namespace
      }
    })
    return NextResponse.json(
      {
        success: true,
        message: "Docs fetched",
        data: [...documents],
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error in files api :: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in fetching docs",
      },
      { status: 500 },
    );
  }
}
