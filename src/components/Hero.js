import * as React from "react"
import HeroImage from "./heroImage"

export default function Hero() {
  return (
    <>
      <div className="mx-auto flex flex-col md:flex-row items-center flex-wrap bg-green-50 dark:bg-transparent py-3 px-4 font-source">
        <HeroImage className="flex-1 p-10 md:p-20" />
        <div className="flex-1 dark:text-white">
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-green-800 dark:text-green-200 font-teko">
            Feeling Overwhelmed? Looking for Help?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl xl:text-2xl mb-3 md:mb-6 lg:max-w-3xl">
            That is why we are here. Whether it's hardware or software, you have
            someone to turn to. Teaching in today's modern classroom requires
            skills in such a wide range of areas. We want to make it easy for
            you reach us for assistance.
          </p>
          <button className="px-6 py-2 block rounded-sm md:text-lg text-white hover:text-green-100 bg-green-900 hover:bg-green-800 hover:shadow-md dark:text-green-900 dark:bg-green-200 dark:hover:bg-green-300 focus:outline-none focus:ring-4 focus:ring-green-300">
            Get Help
          </button>
        </div>
      </div>
    </>
  )
}
