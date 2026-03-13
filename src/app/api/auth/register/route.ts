import { sendOtpMail } from "@/lib/mail";
import { getOTP } from "@/lib/otp";
import redis, { TempUser } from "@/lib/redis";
import { User } from "@/models/user.model";
import { connectDB } from "@/shared/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { name, email, password } = await request.json();

  if (!name || !email || !password)
    return NextResponse.json(
      {
        success: false,
        message: "Missing fields\n-All fields are required.",
      },
      { status: 400 },
    );
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  )
    return NextResponse.json(
      {
        success: false,
        message:
          "Improper data types for required fields\n-All fileds should be string only.",
      },
      { status: 400 },
    );
  if (!/\S+@\S+\.\S+/.test(email))
    return NextResponse.json(
      {
        success: false,
        message: "Invalid email fomat.",
      },
      { status: 400 },
    );
  if (password.length < 8)
    return NextResponse.json(
      {
        success: false,
        message: "Password must be atleast 8 character long.",
      },
      { status: 400 },
    );

  try {
    // get database connection
    await connectDB();

    // check existing user
    let user = await User.findOne({ email });

    if (user)
      return NextResponse.json(
        {
          success: false,
          message: "Email already in use\n-Login directly.",
        },
        { status: 400 },
      );
    // Initialte user email verification - persist the user in temporary storage of redis
    const OTP = getOTP();
    let tempUser: TempUser = {
      name,
      email,
      password,
      otp: OTP,
    };

    // set the data in temporary memory of redis
    await redis.set(
      `tempRegistration:${email + name}`,
      JSON.stringify(tempUser),
      { ex: 120 },
    );

    // send otp on the registered email
    await sendOtpMail(email, OTP);

    return NextResponse.json(
      {
        success: true,
        message: "Email verification required\n-OTP send on registered email.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("Error in user registration :: ", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while registring user\n-Please try again.",
      },
      { status: 500 },
    );
  }
}
