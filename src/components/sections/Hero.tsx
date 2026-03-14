"use client"
import React from "react";
import { md } from "../data/marketingData";
import { Button } from "../ui/button";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";
import heroImg from "../../../public/heroImg.png";
import { useRouter } from "next/navigation";
const Hero = () => {
  const router = useRouter()
  return (
    <div className="relative flex flex-col items-center justify-center w-full min-h-screen gap-6 overflow-hidden mt-30">
      {/* TODO: grid */}

      {/* text */}
      <div className="mx-auto w-full max-w-4xl px-6 py-10 flex flex-col items-center gap-6" id="hero">
        <h1 className="text-3xl lg:text-5xl font-semibold text-center tracking-tight bg-clip-text text-transparent bg-linear-to-br from-primary via-accent to-secondary">
          {md.hero.title}
        </h1>

        <h2 className="text-lg lg:text-2xl font-semibold text-center leading-tight text-muted-foreground">
          {md.hero.subtitle}
        </h2>

        <p className="text-center text-sm max-w-3xl text-muted-foreground">
          {md.hero.description}
        </p>
      </div>

      {/* cta */}
      <div className="flex flex-col lg:flex-row items-center gap-5">
        <Button className="h-14 text-lg px-8 bg-linear-to-r from-primary via-accent to-secondary rounded-full shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer" onClick={e => router.push(`${md.hero.primaryCTA.link}`)}>
          {md.hero.primaryCTA.text}
        </Button>

        <Button
          variant="secondary"
          className="h-14 text-lg px-8 rounded-full border border-border hover:bg-accent/50 transition-all duration-300 cursor-pointer"
          onClick={e => router.push(`${md.hero.secondaryCTA.link}`)}
        >
          {md.hero.secondaryCTA.text} <FaGithub />
        </Button>
      </div>

      {/* image */}
      <div className="mx-auto w-[90%] max-w-5xl mt-10 relative ">
        <div className="absolute -inset-6 bg-linear-to-r from-primary/20 via-accent/20 to-secondary/20 blur-3xl opacity-40"></div>

        <div className="relative border border-border/60 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm bg-background/60">
          <Image
            src={heroImg}
            alt="hero_feature_image"
            className="w-full h-auto transition-transform duration-700 hover:scale-[1.02]"
            priority
            placeholder="blur"
            quality={100}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
