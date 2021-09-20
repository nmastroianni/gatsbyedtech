import * as React from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { Link } from "gatsby"
import Thinker from "../components/Thinker"
import {
  withPrismicUnpublishedPreview,
  componentResolverFromMap,
} from "gatsby-plugin-prismic-previews"
import { linkResolver } from "../utils/linkResolver"
import PageTemplate from "./{PrismicPage.url}"
import PostTemplate from "./{PrismicPost.url}"
import ToolTemplate from "./{PrismicTool.url}"

const NotFoundPage = ({ location: { pathname } }) => {
  return (
    <Layout path={pathname}>
      <Seo title="Resource Not Found" />
      <div className="h-screen mt-3 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
        <div className="max-w-md ">
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
          <Thinker styles="w-full text-green-800 dark:text-green-200 fill-current" />
        </div>
      </div>
    </Layout>
  )
}

export default withPrismicUnpublishedPreview(NotFoundPage, [
  {
    repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
    linkResolver,
    componentResolver: componentResolverFromMap({
      post: PostTemplate,
      page: PageTemplate,
      tool: ToolTemplate,
    }),
  },
])
