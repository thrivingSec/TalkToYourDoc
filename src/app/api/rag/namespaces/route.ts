import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
  try {
    const documentTypes = [
        "technical",
        "engineering",
        "architectural",
        "compliance",
        "legal",
        "internal_policies",
        "refund_policy",
        "product_manual",
        "report",
        "proposal",
        "essay",
        "philosophy",
        "story",
        "medical_doc",
        "academic_paper",
      ]
    return NextResponse.json({success:true, message:"ok", data:{docTypes:documentTypes}}, {status:200})
  } catch (error) {
    return NextResponse.json({success:false, message:"something went wrong" }, {status:500})
  }
}