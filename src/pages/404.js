import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { Link } from "gatsby"
import Thinker from "../components/Thinker"

export default function NotFoundPage({ location: { pathname } }) {
  return (
    <Layout path={pathname}>
      <Seo title="Resource Not Found" />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-md mx-auto flex flex-col justify-center items-center">
          <p className="text-3xl font-semibold text-green-700 text-center">
            We're sorry! <br />
            We can't seem to find what you were looking for.
          </p>
          <Link
            to="/"
            className="block mx-auto mt-6 text-center items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:border-green-200 focus:shadow-outline-blue active:bg-green-600 transition ease-in-out duration-150"
          >
            Visit Our Homepage
          </Link>
          <Thinker styles="w-full text-green-700" />
        </div>
      </div>
    </Layout>
  )
}
