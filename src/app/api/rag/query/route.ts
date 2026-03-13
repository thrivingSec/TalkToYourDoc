import { initializeGraph } from "@/graph/graph";
import { Documents, IDOCUMENT } from "@/models/document.model";
import { Message } from "@/models/message.model";
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
    const { query, documentID } = await request.json();
    if (!query || typeof query !== "string" || query.length < 5) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid query.",
        },
        { status: 400 },
      );
    }
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
    // fetch namespace and source for the document
    const document = await Documents.findById<IDOCUMENT>(documentID);
    if (!document) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid documentID.",
        },
        { status: 400 },
      );
    }
    const { namespace, source, _id } = document;
    const docID = String(_id);
    // update messages
    await Message.create({
      userID,
      docID,
      role: "user",
      content: query,
    });
    // invoke graph
    const finalResponse = await initializeGraph({ query, userID, docID });
    if (!finalResponse) {
      return NextResponse.json(
        {
          success: false,
          message: "Something went wrong",
        },
        { status: 500 },
      );
    }

    // update message
    await Message.create({
      userID,
      docID,
      role: "agent",
      content: finalResponse.answer,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Response generated",
        data: {
          query: finalResponse.query,
          answer: finalResponse.answer,
          citation: {
            chunkIDs: finalResponse.chunkIDs,
            namespace: finalResponse.contexts?.[0].namespace,
            source: finalResponse.contexts?.[0].source,
          },
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error in query api :: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in aswering the query",
      },
      { status: 500 },
    );
  }
}
