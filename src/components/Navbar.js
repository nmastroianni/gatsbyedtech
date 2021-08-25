import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"
import Headroom from "react-headroom"
import HeadlessMenu from "./Menu"

export default function Navbar({ path }) {
  return (
    <Headroom className="text-white" style={{ background: "#064E3B" }}>
      <div className="flex justify-between items-center mx-auto py-3 px-2 md:px-6">
        <div className="flex justify-start items-center" id="branding">
          <StaticImage
            src="../images/lbpsSeal.png"
            alt="Long Branch Public Schools Seal/Logo"
            placeholder="blurred"
            className="w-0 h-0 sm:w-10 sm:h-10 sm:-mt-1 md:-mt-2 mr-1 sm:mr-2 md:mr-3 lg:mr-5"
          />
          <Link to="/">
            <div>
              <span className="hidden md:inline text-xl sm:text-2xl md:text-3xl lg:text-5xl font-teko">
                Educational Technology{" "}
              </span>
              <span className="inline md:hidden text-xl sm:text-2xl md:text-3xl lg:text-5xl font-teko">
                EdTech{" "}
              </span>
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-teko inline">
                Department
              </span>
            </div>
          </Link>
        </div>
        <nav>
          <HeadlessMenu path={path} />
        </nav>
      </div>
    </Headroom>
  )
}
