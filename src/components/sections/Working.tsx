import React from 'react'
import { md } from '../data/marketingData'

const Working = () => {
  const data = md.working
  return (
    <section className="relative py-32 overflow-hidden">
      
      <div className="mx-auto max-w-5xl px-6 flex flex-col gap-24" id='working'>

        {/* header */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl lg:text-5xl font-semibold bg-clip-text text-transparent bg-linear-to-br from-primary via-accent to-secondary">
            {data.title}
          </h2>

          <p className="text-muted-foreground mt-6 text-sm tracking-tight">
            {data.description}
          </p>
        </div>

        {/* pipeline */}
        <div className="relative flex flex-col gap-16">

          {/* vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border " />

          {data.sections.map((section, i) => (
            <div key={i} className="relative flex gap-8 items-start">

              {/* node */}
              <div className="relative z-5 flex items-center justify-center h-10 w-10 rounded-full bg-linear-to-br from-primary via-accent to-secondary text-white font-semibold shadow-lg">
                {i + 1}
              </div>

              {/* card */}
              <div className="flex-1 rounded-2xl border border-border bg-card/60 backdrop-blur-sm p-8 shadow-xl hover:shadow-2xl dark:hover:shadow-accent transition">

                <h3 className=" font-semibold mb-4">
                  {section.title}
                </h3>

                <ul className="flex flex-col gap-3">
                  {section.steps.map((step, j) => (
                    <li
                      key={j}
                      className="text-muted-foreground text-sm flex gap-3"
                    >
                      <span className="h-1.5 w-1.5 mt-2 rounded-full bg-accent"></span>
                      {step}
                    </li>
                  ))}
                </ul>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  )
}

export default Working