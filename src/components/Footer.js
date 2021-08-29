import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
export default function Footer() {
  return (
    <footer className="mt-auto p-6 lg:p-12 bg-black dark:text-white">
      <div id="district-branding" className="flex justify-center items-center">
        <StaticImage
          src="../images/lbpsSeal.png"
          alt="Long Branch Public Schools Seal/Logo"
          placeholder="blurred"
          className="w-12 mr-3"
        />
        <div>
          <h2 className="text-center font-source font-bold text-green-900 dark:text-green-100">
            Long Branch Public Schools
          </h2>
          <h3 className="text-xs text-center">
            "Together, We Can" #juntosPodemos
          </h3>
        </div>
      </div>
    </footer>
  )
}
