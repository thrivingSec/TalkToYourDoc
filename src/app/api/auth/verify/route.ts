import { sendWelcomeMail } from "@/lib/mail";
import redis, { TempUser } from "@/lib/redis";
import { User } from "@/models/user.model";
import { connectDB } from "@/shared/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { key, otp } = await request.json();
  if (!key || !otp)
    return NextResponse.json(
      { success: false, message: "Missing fields\n-All fields are required." },
      { status: 400 },
    );
  if (typeof key !== "string" || typeof otp !== "number")
    return NextResponse.json(
      {
        success: false,
        message: "Improper data types for required fields",
      },
      { status: 400 },
    );
  try {
    // get databse connection
    await connectDB();

    // fetch data from redis
    const user = await redis.get<TempUser>(`tempRegistration:${key}`);
    if (!user)
      return NextResponse.json(
        {
          success: false,
          message: "Timeout\n-Please register again.",
        },
        { status: 400 },
      );
    const validOtp = user.otp === otp;
    if (!validOtp)
      return NextResponse.json(
        {
          success: false,
          message: "Inccorect OTP",
        },
        { status: 400 },
      );
    // create the user in database
    const newUser = await User.create({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    await sendWelcomeMail(user.email, user.name);
    return NextResponse.json(
      {
        success: true,
        message: "Verification completed\n-Please login",
      },
      { status: 201 },
    );
  } catch (error) {
    console.log("Error in email verification :: ", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong with email verification\n-Please try again.",
      },
      { status: 500 },
    );
  }
}
