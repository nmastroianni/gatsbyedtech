import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

export default function Hero({
  bannerDescription,
  bannerLink,
  bannerLinkLabel,
  bannerTitle,
  heroImage,
}) {
  const { alt, gatsbyImageData } = heroImage
  return (
    <>
      <div className="mx-auto grid grid-cols-1 md:space-x-4 md:grid-cols-2 place-items-center flex-wrap bg-green-50 dark:bg-transparent py-3 px-3 font-source">
        <div className="text-center py-3 md:py-6 lg:py-12">
          <GatsbyImage
            image={getImage(gatsbyImageData)}
            alt={alt ? alt : `Decorative Image`}
            className="w-4/5 md:w-3/4 lg:w-3/5 "
          />
        </div>
        <div className=" dark:text-white my-4 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-center md:text-left text-green-800 dark:text-green-200 font-teko">
            {bannerTitle}
          </h2>
          <p className="text-base text-left sm:text-lg lg:text-xl xl:text-2xl mb-3 md:mb-6 lg:max-w-3xl">
            {bannerDescription}
          </p>
          <Link
            to={bannerLink ? bannerLink : "/help"}
            className="inline-block px-4 py-3 my-3 border-2 text-green-800 dark:text-green-200 border-green-800 dark:border-green-400 rounded-md hover:shadow-md hover:bg-green-200 hover:bg-opacity-20 dark:hover:bg-black dark:hover:bg-opacity-70 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            {bannerLinkLabel}
          </Link>
        </div>
      </div>
    </>
  )
}
