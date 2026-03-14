import React from "react";
import { md } from "../data/marketingData";

const Namespace = () => {
  const data = md.namespace;
  return (
    <section className="relative overflow-hidden w-full max-w-5xl">
      {/* background glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-200 h-100 bg-secondary/20 blur-[120px] -z-10" />

      <div className="mx-auto px-6 flex flex-col gap-20 items-center justify-center" id="namespace">
        {/* heading */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-5xl font-semibold bg-clip-text text-transparent bg-linear-to-br from-primary via-accent to-secondary">
            {data.title}
          </h2>

          <p className="text-muted-foreground mt-6 text-sm">
            {data.description}
          </p>
        </div>

        {/* main layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* explanation */}
          <div className=" gap-6 grid grid-cols-1 grid-rows-4">
            {data.details.map((item, i) => (
              <div
              className="row-span-1 flex flex-col gap-3 items-start justify-center p-2 border-t border-border"
              key={i}
            >
              <h2 className="text-sm text-foreground tracking-tight">
                {item}
              </h2>
            </div>
            ))}
          </div>
          {/* image */}
          <div className=" w-full h-full overflow-hidden rounded-2xl relative">
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
        </div>
      </div>
    </section>
  );
};

export default Namespace;
