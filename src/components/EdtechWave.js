import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"

export default function EdtechWave() {
  return (
    <section
      id="edtech-wave"
      className="max-w-screen-md mx-auto text-center py-3"
    >
      <a href="https://docs.google.com/presentation/d/e/2PACX-1vRHPhCxXBwrgw8-JJOiVtHmxI4fMjG69AWL_QMfL7tOWMxVfERd5bdVdSjMb15GmpI-VdLzXXEOugMO/pub?start=false&loop=true&delayms=3000">
        <figure className="relative">
          <StaticImage
            alt=""
            src="../images/september21wave.png"
            placeholder="blurred"
            className="rounded-sm shadow-md"
          />

          <figcaption className="italic text-green-700 dark:text-green-200 my-3 text-lg">
            Check Out Our September Edition of the EdTech Wave...
          </figcaption>
        </figure>
      </a>
    </section>
  )
}
