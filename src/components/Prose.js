import * as React from "react"

export default function Prose({ children }) {
  return (
    <p className="prose prose-green prose-lg mx-auto dark:text-white">
      {children}
    </p>
  )
}
