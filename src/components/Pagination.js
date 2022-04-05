// Example Pagination.js file

import * as React from "react"
import { Link } from "gatsby"
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"

// Create URL path for numeric pagination
// const getPageNumberPath = (currentIndex, basePath) => {
//   if (currentIndex === 0) {
//     return basePath
//   }
//   return `${basePath}/` + (currentIndex + 1)
// }

export const Pagination = ({ currentPage, pageCount, basePath }) => {
  if (!currentPage || !pageCount) return null
  // Create URL path for previous and next buttons
  const prevPagePath =
    currentPage - 1 === 1
      ? basePath
      : `${basePath}/` + (currentPage - 1).toString()
  const nextPagePath = `${basePath}/` + (currentPage + 1).toString()

  // Check if page is first or last to disable previous and next buttons
  const prevClass = currentPage === 1 ? "pointer-events-none" : "enabled"
  const nextClass =
    currentPage === pageCount ? "pointer-events-none" : "enabled"

  return (
    <div className="flex justify-center space-x-4 text-emerald-800 dark:text-emerald-200 text-xl ">
      <Link
        className={`${prevClass} dark:bg-black bg-opacity-50 px-4 py-2 rounded focus:outline-none focus:ring-4 focus:ring-emerald-300`}
        to={prevPagePath + "/"}
        rel="prev"
      >
        <FaAngleLeft className="w-4 inline" /> Previous
      </Link>
      {/*  Render numeric pagination  */}
      {/* {Array.from({ length: pageCount }, (_, i) => {
        let numClass = "invisible"
        if (currentPage === i + 1) {
          numClass = "visible"
        }
        return (
          <Link
            to={getPageNumberPath(i, basePath) + "/"}
            className={`py-2 px-3 shadow rounded relative focus:outline-none focus:ring-4 focus:ring-emerald-300`}
            key={i + 1}
          >
            {i + 1}
            <span
              aria-hidden="true"
              className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 animate-pulse ${numClass}`}
            >
              •
            </span>
          </Link>
        )
      })} */}
      <Link
        className={`${nextClass} dark:bg-black bg-opacity-50 px-4 py-2 rounded focus:outline-none focus:ring-4 focus:ring-emerald-300`}
        to={nextPagePath + "/"}
        rel="next"
      >
        Next <FaAngleRight className="w-4 inline" />
      </Link>
    </div>
  )
}
