import * as React from "react"
import { MDXProvider } from "@mdx-js/react"
import Navbar from "./Navbar"
import { BsArrowReturnLeft } from "react-icons/bs"

export default function Layout({ children }) {
  return (
    <MDXProvider className="relative">
      <ul id="nav-access" className="relative mx-auto">
        <li>
          <a
            href="#main-content"
            className="absolute z-50 -top-20 sm:left-1/4 text-2xl text-green-200 inline-block w-full sm:w-1/2 text-center bg-gray-900 bg-opacity-30 transform focus:translate-y-20 transition-all duration-500 ease-in-out"
          >
            Skip to main content{" "}
            <span className="text-gray-800 px-3 py-0 bg-green-200 text-base rounded-sm">
              Return
              <BsArrowReturnLeft className="w-3 h-3 inline text-gray-800 ml-1" />
            </span>
          </a>
        </li>
      </ul>
      <div className="flex flex-col min-h-screen dark:bg-gray-900">
        <header>
          <Navbar />
        </header>
        <main id="main-content" className="">
          {children}
        </main>
        <footer className="mt-auto">Footer Goes Here</footer>
      </div>
    </MDXProvider>
  )
}
