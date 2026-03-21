"use client"
import React from 'react'
import { md } from '../data/marketingData'
import { useRouter } from 'next/navigation'
const Pricing = () => {
  const router = useRouter()
  const data = md.pricing
  return (
    <section className="relative py-32 w-full h-screen">

      <div className="mx-auto max-w-5xl px-6 flex flex-col items-center gap-16" id='pricing'>

        {/* heading */}
        <div className="w-full flex flex-col items-center justify-center gap-10">
          <div className="text-3xl lg:text-5xl font-semibold bg-clip-text text-transparent bg-linear-to-br from-primary via-accent to-secondary">
            {data.title}
          </div>

          <p className="text-muted-foreground text-sm">
            {data.description}
          </p>
        </div>

        {/* pricing card */}
        <div className="w-full max-w-xl rounded-2xl border border-border bg-card/70 backdrop-blur-sm p-10 shadow-2xl flex flex-col gap-8">

          <div className="text-center">

            <div className="text-4xl font-semibold">
              Free
            </div>

            <div className="text-muted-foreground mt-2">
              Personal Project
            </div>

          </div>

          <ul className="flex flex-col gap-4 text-muted-foreground">
            {data.details.map((item, i) => (
              <li key={i} className="flex gap-3 text-sm items-start">
                <span className="h-2 w-2 mt-2 rounded-full bg-accent shrink-0"></span>
                <p>{item}</p>
              </li>
            ))}
          </ul>

          <button className="mt-6 w-full rounded-full bg-linear-to-r from-primary via-accent to-secondary py-4 text-white font-semibold hover:scale-105 transition cursor-pointer" onClick={e => router.push("/register")}>
            Try the Demo
          </button>

        </div>

      </div>
    </section>
  )
}

export default Pricing