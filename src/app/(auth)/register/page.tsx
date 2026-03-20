"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface FORMDATA {
  name: string;
  email: string;
  password: string;
}

interface REGISTERRES {
  success:boolean;
  message:string;
}

const RegisterPage = () => {
  const [formData, setFormData] = useState<FORMDATA>({
    name: "",
    email: "",
    password: "",
  });
  const [registering, setRegistering] = useState(false);
  const router = useRouter();
  const formValidator = (data: FORMDATA) => {
    if (!data.email.trim()) return toast.error("Email is required!");
    if (!/\S+@\S+\.\S+/.test(data.email.trim()))
      return toast.error("Invalid email!");
    if (!data.name.trim()) return toast.error("Name is required.");
    if (!data.password.trim()) return toast.error("Password is required");
    if (data.password.length < 6)
      return toast.error("Password must be atleast 6 characters long!");
    return true;
  };
  async function handleregistration(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const validation = formValidator(formData);
    if (validation !== true) {
      toast.error("Invalid input inside the required fields.");
      return;
    }
    setRegistering(true);
    try {
      const response = await axios.post<REGISTERRES>(
        "https://talk-to-your-doc.vercel.app/api/auth/register",
        formData,
      );
      const resData = response.data;
      if(resData.success === true){
        sessionStorage.setItem(
        "registration_key",
        formData.email + formData.name,
      );
      toast.success(`${resData.message}`);
      router.push("/verify");
      }
      
    } catch (error) {
      console.log("Error in user registration from :: ", error);
    } finally {
      setRegistering(false);
      setFormData({ email: "", name: "", password: "" });
    }
  }
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* CARD */}
        <div className="rounded-2xl border border-border bg-card shadow-sm p-8 relative">
          {/* Light effect */}
          <div className="absolute -inset-6 bg-linear-to-r from-primary/20 via-accent/20 to-secondary/20 blur-3xl opacity-40"></div>

          {/* HEADER */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-semibold">Create an account</h1>

            <p className="text-sm text-muted-foreground mt-1">
              Start building your AI knowledge base
            </p>
          </div>

          {/* FORM */}
          <form
            className="flex flex-col gap-5 relative"
            onSubmit={handleregistration}
          >
            {/* NAME */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name
              </label>

              <input
                id="name"
                type="text"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="John Doe"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                value={formData.name}
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>

              <input
                id="email"
                type="text"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="john@doe.com"
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
                placeholder="password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                value={formData.password}
              />
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="mt-2 h-11 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition"
              disabled={registering}
            >
              {registering ? "Registering..." : "Create Account"}
            </button>
          </form>
          <div className="w-full text-center text-sm mt-5 relative">
            <p>
              Already have an account?{" "}
              <span
                className="text-accent text-md cursor-pointer"
                onClick={(e) => router.push("/signin")}
              >
                Signin
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
