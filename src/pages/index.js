import * as React from "react"
import Layout from "../components/Layout"
import GreenHeading from "../components/GreenHeading"
import HeroImage from "../components/heroImage"

export default function Home() {
  return (
    <Layout>
      <div className="mx-auto flex flex-col md:flex-row items-center flex-wrap bg-green-50 dark:bg-transparent py-3 px-4 font-source">
        <HeroImage className="flex-1 p-10 md:p-20" />
        <div className="flex-1 dark:text-white">
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-green-800 dark:text-green-200 font-teko">
            Feeling Overwhelmed?
            <br /> Looking for Help?
          </h2>
          <p className="text-lg">
            That is why we are here. Whether it's hardware or software, you have
            someone to turn to. Teaching in today's modern classroom requires
            skills in such a wide range of areas. We want to make it easy for
            you reach us for assistance.
          </p>
        </div>
      </div>
    </Layout>
  )
}
