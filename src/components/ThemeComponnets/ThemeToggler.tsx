"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import {SunMoon} from 'lucide-react'

const ThemeToggler = () => {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <button
      className="border-2 p-2 rounded-lg"
      onClick={() => (theme === "light" ? setTheme("dark") : setTheme("light"))}
    >
      <SunMoon/>
    </button>
  );
};

export default ThemeToggler;
