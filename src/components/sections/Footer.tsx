import React from "react";
import { md } from "../data/marketingData";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";

const Footer = () => {
  const data = md.footer;
  return (
    <div className="w-full flex items-center justify-center pt-16" >
      <footer className="relative border-t border-border py-24 w-full max-w-5xl overflow-hidden mx-auto">
      {/* background glow */}
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-primary/5 via-transparent to-transparent" />

      <div className="mx-auto w-full px-6">
        <div className="flex flex-col gap-16">
          {/* top */}
          <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:justify-between lg:text-left gap-12">
            {/* brand */}
            <div className="max-w-md">
              <div className="text-2xl font-semibold bg-clip-text text-transparent bg-linear-to-br from-primary via-accent to-secondary">
                Talk To Your Docs
              </div>

              <p className="text-muted-foreground mt-4 leading-relaxed text-sm">
                {data.tagline}
              </p>
            </div>

            {/* social links */}
            <div className="flex items-center gap-8">
              <a
              target="_blank"
                href={data.links.github}
                aria-label="GitHub"
                className="text-muted-foreground hover:text-foreground transition transform hover:scale-110"
              >
                <FaGithub className="size-7" />
              </a>

              <a
              target="_blank"
                href={data.links.portfolio}
                aria-label="Portfolio"
                className="text-muted-foreground hover:text-foreground transition transform hover:scale-110"
              >
                <IoPersonCircle className="size-7" />
              </a>

              <a
              target="_blank"
                href={data.links.linkedin}
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-foreground transition transform hover:scale-110"
              >
                <FaLinkedin className="size-7" />
              </a>
            </div>
          </div>

          {/* divider */}
          <div className="border-t border-border w-full" />

          {/* bottom */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="text-sm bg-clip-text text-transparent bg-linear-to-br from-primary via-accent to-secondary">
              {data.credits}
            </div>

            <div className="text-xs text-muted-foreground opacity-70 max-w-lg">
              {data.disclaimer}
            </div>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
