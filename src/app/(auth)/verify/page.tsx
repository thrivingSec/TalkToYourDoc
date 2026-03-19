"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface VERIFYRES {
  success:boolean;
  message:string;
}


const VerifyPage = () => {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const router = useRouter()
  const [verifying, setVerifying] = useState(false)

  // countdown logic
  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // format mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  async function handleVerification(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const key = sessionStorage.getItem("registration_key");
    if(timeLeft === 0){
      toast.error("Please register again.");
      router.push("/register")
    }
    if (otp.length !== 5) {
      toast.error("Invalid OTP.");
      return;
    }
    if(!key){
      toast.error("Please register again.");
      return;
    }
    const formData = { key, otp: Number(otp) };
    setVerifying(true);
    try {
      const response = await axios.post<VERIFYRES>(
        `https://talk-to-your-doc-fk7e.vercel.app/api/auth/verify`,
        formData,
      );
      const resData = response.data;
      if(resData.success === true){
        toast.success(`${resData.message}`);
        router.push("/signin")
      }
    } catch (error: any) {
      console.log("Error in user registration from :: ", error);
      toast.error("Error in email verification")
    } finally {
      setVerifying(false);
      setOtp("")
    }
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-border bg-card shadow-sm p-8 relative">
          {/* light effect */}
      <div className="absolute -inset-6 bg-linear-to-r from-primary/20 via-accent/20 to-secondary/20 blur-3xl opacity-40"></div>
          {/* HEADER */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold">Verify your account</h1>

            <p className="text-sm text-muted-foreground mt-1">
              Enter the OTP sent to your email
            </p>
          </div>

          {/* FORM */}
          <form className="flex flex-col gap-5 relative" onSubmit={handleVerification}>
            {/* OTP INPUT */}
            <div className="flex flex-col gap-2">
              <label htmlFor="otp" className="text-sm font-medium">
                OTP Code
              </label>

              <input
                id="otp"
                type="text"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary tracking-widest text-center text-lg"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>

            {/* TIMER */}
            <div className="text-sm text-center text-muted-foreground">
              {timeLeft > 0 ? (
                <span>
                  OTP expires in{" "}
                  <span className="font-medium">{formattedTime}</span>
                </span>
              ) : (
                <span className="text-red-500">
                  OTP expired. Request a new one.
                </span>
              )}
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="mt-2 h-11 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
              disabled={timeLeft === 0 || verifying}
            >
              {verifying ? "Verifying" : "Verify Account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
