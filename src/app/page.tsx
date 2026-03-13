
import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Namespace from "@/components/sections/Namespace";
import Navbar from "@/components/sections/Navbar";
import Pricing from "@/components/sections/Pricing";
import Working from "@/components/sections/Working";
import React from "react";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center justify-center bg-background text-foreground overflow-hidden">
      <Navbar/>
      <Hero/>
      <Features/>
      <Working/>
      <Namespace/>
      <Pricing/>
      <Footer/>
    </div>
  );
}
