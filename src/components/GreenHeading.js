import * as React from "react"

export default function GreenHeading({ text, name }) {
  return (
    <header className="py-2 sm:py-3 lg:py-5 max-w-none bg-green-900 shadow-md">
      <h2
        className="text-white text-center text-2xl sm:text-3xl md:text-4xl font-teko min-w-full"
        id={name}
        style={{ color: "#fff", margin: 0 }}
      >
        {text}
      </h2>
    </header>
  )
}
