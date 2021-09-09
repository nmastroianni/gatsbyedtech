import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
export default function Footer() {
  return (
    <footer className="mt-auto p-6 lg:p-12 bg-gray-100 dark:bg-black dark:text-white">
      <div
        id="district-branding"
        className="flex justify-center items-center font-source"
      >
        <StaticImage
          src="../images/lbpsSeal.png"
          alt="Long Branch Public Schools Seal/Logo"
          placeholder="blurred"
          className="w-12 mr-3"
        />
        <div>
          <h2 className="text-center font-bold text-green-900 dark:text-green-100">
            Long Branch Public Schools
          </h2>
          <h3 className="text-xs text-center dark:text-white">
            "Together We Can" #JuntospodemosLB
          </h3>
        </div>
      </div>
    </footer>
  )
}
