"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const SigninPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [signin, setSignin] = useState(false);
  const router = useRouter();
  async function handleregistration(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formData.email.length === 0 || formData.password.length < 6) {
      toast.error("Invalid data in the input fields.");
      return;
    }
    setSignin(true);
    try {
      const response = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: true,
      });
    } catch (error) {
      console.log("Error in user registration from :: ", error);
    } finally {
      setSignin(false);
      setFormData({ email: "", password: "" });
    }
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* CARD */}
        <div className="rounded-2xl border border-border bg-card shadow-sm p-8 relative">
          {/* light effect */}
          <div className="absolute -inset-6 bg-linear-to-r from-primary/20 via-accent/20 to-secondary/20 blur-3xl opacity-40"></div>

          {/* HEADER */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold">Sign in</h1>

            <p className="text-sm text-muted-foreground mt-1">
              Access your AI document workspace
            </p>
          </div>

          {/* FORM */}
          <form
            className="flex flex-col gap-5 relative"
            onSubmit={handleregistration}
          >
            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>

              <input
                id="email"
                type="text"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                value={formData.email}
              />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>

              <input
                id="password"
                type="password"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                value={formData.password}
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="mt-2 h-11 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
              disabled={signin}
            >
              {signin ? "Signin in..." : "Sign in"}
            </button>
          </form>

          <div className="w-full text-center text-sm mt-5 relative">
            <p>
              Not registered yet?{" "}
              <span
                className="text-accent text-md cursor-pointer"
                onClick={(e) => router.push("/register")}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
