import Image from "next/image";
import React from "react";
import heroImg from "../../../public/heroImg.png";
import { md } from "../data/marketingData";

const Features = () => {
  return (
    <div className="grid grid-cols-1 grid-rows-4 w-full min-h-screen mt-10 gap-2">
      <div className="row-span-1 flex items-center justify-center" id="features">
        <h1 className="text-3xl lg:text-5xl font-semibold text-center bg-clip-text text-transparent bg-linear-to-br from-primary via-accent to-secondary">
          Features
        </h1>
      </div>
      <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center row-span-3 gap-5">
        {/* left image */}
        <div className="w-[90%] lg:w-3xl h-full overflow-hidden rounded-2xl relative">
          <div className="absolute -inset-6 bg-linear-to-r from-primary/20 via-accent/20 to-secondary/20 blur-3xl opacity-40"></div>
          {/* <Image
            src={heroImg}
            alt="hero_feature_image"
            className="w-full transition-transform duration-700 hover:scale-[1.02] relative"
            priority
            placeholder="blur"
            quality={100}
          /> */}
        </div>
        {/* right text */}
        <div className="w-[90%] lg:w-2xl h-full grid grid-cols-1 grid-rows-5 gap-1">
          {md.features.map((feature, index) => (
            <div
              className="row-span-1 flex flex-col gap-3 items-start p-2 border-t border-border"
              key={index}
            >
              <h2 className="bg-clip-text text-transparent bg-linear-to-r from-foreground to-gray-500 font-bold tracking-tight">
                {feature.title}
              </h2>
              <p className="font-medium tracking-tight leading-normal text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
