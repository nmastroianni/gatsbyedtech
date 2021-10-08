import * as React from "react"
import { useEffect } from "react"
import { Link } from "gatsby"
import Navbar from "./Navbar"
import Footer from "./Footer"
import { BsArrowReturnLeft } from "react-icons/bs"
import { HiThumbDown, HiThumbUp, HiX } from "react-icons/hi"

export default function Layout({ children, path }) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const consentModal = document.querySelector("#tracking-consent")
      setTimeout(() => {
        consentModal.classList.remove("invisible")
        const closeButton = document.querySelector("#close-consent")
        closeButton.addEventListener("click", () => {
          consentModal.classList.add("invisible")
        })
      }, 1200)
    }
  })
  return (
    <div className="relative">
      {process.env.NODE_ENV === "production" ? (
        <div
          id="tracking-consent"
          className="fixed border-4 border-double border-yellow-300 transition duration-700 ease-in-out bg-gray-200 dark:bg-gray-700 rounded p-3 md:p-4 lg:p-6 w-full md:w-1/2 lg:w-1/3 left-1/2 transform -translate-x-1/2 top-10 z-50 invisible"
        >
          <button id="close-consent" className="absolute right-2 top-2">
            <HiX className="text-gray-800 dark:text-white" />
            <span className="sr-only">Close this consent window</span>
          </button>
          <header className="prose dark:prose-dark">
            This site uses cookies to measure how visitors use our site.
          </header>
          <div className="text-xs text-green-800 dark:text-green-200 mb-3 md:mb-4 lg:mb-6">
            <Link to="/privacy/">View Our Privacy Policy</Link>
          </div>
          <div className="grid grid-cols-2 text-green-800 dark:text-green-200">
            <button
              id="decline-tracking"
              className="px-2 py-3 border border-green-800 dark:border-green-400 transition duration-300 ease-in-out dark:hover:text-green-300 hover:bg-green-200 dark:hover:bg-gray-800 hover:bg-opacity-50 rounded mr-3"
            >
              <HiThumbDown className="inline" /> Decline
            </button>
            <button
              id="accept-tracking"
              className="px-2 py-3 border border-green-800 dark:border-green-400 transition duration-300 ease-in-out dark:hover:text-green-200 hover:bg-green-100 dark:hover:bg-gray-600 hover:bg-opacity-50 rounded ml-3"
            >
              <HiThumbUp className="inline" /> Accept
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
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
          <Navbar path={path} />
        </header>
        <main id="main-content">{children}</main>
        <Footer />
      </div>
    </div>
  )
}
