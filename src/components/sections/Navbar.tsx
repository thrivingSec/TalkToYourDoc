"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { LuSunMoon } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
const Navbar = () => {
  const { setTheme, theme } = useTheme();
  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#working", label: "How it works?" },
    { href: "#namespace", label: "Namespace" },
    { href: "#pricing", label: "Pricing" },
  ];
  const [menu, setMenu] = useState<boolean>(false);
  const router = useRouter();
  return (
    <div className="w-full px-4 py-4 flex-col lg:flex items-center justify-center fixed top-0 left-0 z-10 bg-background text-foreground">
      <header className="w-full flex flex-1 items-center justify-between mx-auto lg:max-w-5xl p-2 border border-border rounded-lg">
        {/* logo - left */}
        <div className="flex flex-1 items-center gap-2 justify-start">
          <div className="flex items-center gap-2 ml-2">
            {/* name */}
            <Link className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-br from-primary via-accent to-secondary" href={"#hero"}>
              TalkToYourDocs
            </Link>
          </div>
        </div>
        {/* nav and CTAs - right */}
        <div className="items-center justify-between hidden lg:flex gap-8">
          {/* navigations */}
          <div className="flex flex-1 items-center justify-between gap-3 border-r-2 border-border pr-5">
            {navLinks.map((link, index) => (
              <nav className="px-1" key={index}>
                <a
                  href={`${link.href}`}
                  className="text-card-foreground hover:text-primary transition-all duration-300"
                >
                  {" "}
                  {link.label}{" "}
                </a>
              </nav>
            ))}
          </div>
          {/* primary & secondary cta */}
          <div className="flex items-center justify-center gap-4">
            {/* primary cta */}
            <div className="flex flex-1 items-center justify-center">
              <Button
                className="bg-primary text-primary-foreground p-5 rounded-2xl transition-all duration-300 cursor-pointer"
                onClick={(e) => router.push("/register")}
              >
                Get Started
              </Button>
            </div>
            {/* secondary cta */}
            <div className="flex flex-1 items-center justify-center gap-3">
              {/* login */}
              <Button
                className="bg-secondary text-secondary-foreground p-5 rounded-2xl transition-all duration-300 cursor-pointer"
                onClick={(e) => router.push("/signin")}
              >
                Login
              </Button>
              {/* theme toggle */}
              <Button
                className="bg-secondary text-secondary-foreground rounded-full overflow-hidden w-10 h-10 cursor-pointer transition-all duration-300"
                onClick={(e) => {
                  if (theme === "light" || theme === "system") {
                    setTheme("dark");
                  } else {
                    setTheme("light");
                  }
                }}
              >
                <LuSunMoon />
              </Button>
            </div>
          </div>
        </div>
        {/* hamburger - small screen */}
        <div className="flex flex-1 items-center justify-end gap-5 lg:hidden">
          {/* theme toggle */}
          <Button
            className="bg-secondary text-secondary-foreground rounded-full overflow-hidden w-10 h-10 cursor-pointer transition-all duration-300"
            onClick={(e) => {
              if (theme === "light" || theme === "system") {
                setTheme("dark");
              } else {
                setTheme("light");
              }
            }}
          >
            <LuSunMoon />
          </Button>
          {/* menu toggle button */}
          <div>
            {!menu ? (
              <Button
                className="bg-secondary text-secondary-foreground rounded-full overflow-hidden w-10 h-10 cursor-pointer transition-all duration-300"
                onClick={(e) => setMenu(true)}
              >
                <RxHamburgerMenu />
              </Button>
            ) : (
              <Button
                className="bg-secondary text-secondary-foreground rounded-full overflow-hidden w-10 h-10 cursor-pointer transition-all duration-300"
                onClick={(e) => setMenu(false)}
              >
                <IoMdClose />
              </Button>
            )}
          </div>
        </div>
      </header>
      {menu ? (
        <div className="w-full h-full py-10 px-10 rounded-2xl bg-popover flex flex-col lg:hidden text-popover-foreground gap-5 mt-5">
          {/* primary cta */}
          <div className="flex flex-1">
            <Button className="bg-primary text-primary-foreground p-5 rounded-2xl transition-all duration-300 cursor-pointer">
              Get Started
            </Button>
          </div>
          {/* navigations */}
          <div className="flex-col items-start justify-between gap-y-3 border-r-2 border-border pr-5">
            {navLinks.map((link, index) => (
              <nav className="px-1" key={index} onClick={e => setMenu(false)}>
                <a
                  href={`${link.href}`}
                  className="text-card-foreground hover:text-primary transition-all duration-300"
                >
                  {" "}
                  {link.label}{" "}
                </a>
              </nav>
            ))}
          </div>
          {/* secondary cta */}
          <div className="flex flex-1">
            {/* login */}
            <Button className="bg-secondary text-secondary-foreground p-5 rounded-2xl transition-all duration-300 cursor-pointer">
              Login
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
