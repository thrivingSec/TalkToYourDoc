import { Documents, IDOCUMENT } from "@/models/document.model";
import { IMESSAGE, Message } from "@/models/message.model";
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
    const { documentID } = await request.json();
    if (
      !documentID ||
      typeof documentID !== "string" ||
      documentID.length < 5
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid/missing documentID",
        },
        { status: 400 },
      );
    }
    // get database connection
    await connectDB();
    // check
    const document = await Documents.find<IDOCUMENT>({
      _id: documentID,
      userID,
    });
    if (!document) {
      return NextResponse.json(
        {
          success: false,
          message: "Wrong documentID.",
        },
        { status: 400 },
      );
    }
    const rawMessages = await Message.find<IMESSAGE>({
      userID,
      docID: documentID,
    }).sort({ createdAt: 1 });
    if (!rawMessages) {
      return NextResponse.json(
        {
          success: false,
          message: "No conversations yet.",
          data:[]
        },
        { status: 200 },
      );
    }
    const messages = rawMessages.map((message) => {
      return  {
        role:message.role,
        content:message.content
      }
    })
    return NextResponse.json(
      {
        success: true,
        message: "Messages fetched",
        data: [...messages],
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error in message api :: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in fetching messages.",
      },
      { status: 500 },
    );
  }
}
