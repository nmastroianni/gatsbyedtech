import * as React from "react"
import { HiLink } from "react-icons/hi"

export default function GreenHeading({ text, name }) {
  return (
    <header className="group py-2 sm:py-3 lg:py-5 flex justify-center items-center bg-green-900 shadow-md dark:bg-opacity-50 text-center">
      <button
        className="text-green-900 dark:text-opacity-0 group-hover:text-opacity-100 focus:text-white focus:text-opacity-100 transition duration-300 ease-in-out group-hover:text-white inline"
        onClick={() => {}}
      >
        <HiLink className="h-8 w-8 mx-1" />
      </button>
      <h2
        className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-teko inline"
        id={name}
        style={{ color: "#fff", margin: 0 }}
      >
        {text}
      </h2>
    </header>
  )
}
