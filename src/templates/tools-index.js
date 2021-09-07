import * as React from "react"
import { graphql, Link } from "gatsby"
import Seo from "../components/Seo"
import Layout from "../components/Layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Pagination } from "../components/Pagination"

const ToolCard = ({ title, url }) => {
  return (
    <article className="p-3">
      <h2 className="my-3 text-green-800 dark:text-green-200 text-xl md:text-2xl xl:text-3xl font-teko text-center">
        {title} | {url}
      </h2>
    </article>
  )
}

export default function Tools({
  path,
  pageContext: { currentPage, limit, numPages, basePath },
  data: {
    allPrismicTool: { nodes },
  },
}) {
  return (
    <Layout path={path}>
      <Seo title="Tools" locale="en-US" />
      <div className="mx-auto flex flex-col justify-between">
        <header className="bg-gray-50 dark:bg-gray-800 mb-2 sm:mb-4 lg:mb-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl py-3 md:py-4 lg:py-6 text-green-800 dark:text-green-200 font-teko">
            EdTech Tools
          </h1>
          <h2 className="pb-3 md:pb-4 lg:pb-6 text-xl md:text-2xl lg:text-3xl text-green-700 dark:text-green-100 font-teko">
            Page {currentPage} of {numPages}
          </h2>
        </header>
        <div className="my-6">
          <Pagination
            currentPage={currentPage}
            pageCount={numPages}
            basePath={basePath}
          />
        </div>
        <ul className="list-none mx-auto grid md:grid-cols-2 xl:grid-cols-3 place-items-center gap-3 md:gap-4 lg:gap-6">
          {nodes.map(tool => {
            const {
              data: { tool_description, tool_logo, tool_title },

              prismicId,
              url,
            } = tool

            return (
              <li
                key={prismicId}
                className="rounded-md border-4 border-gray-200 dark:border-gray-600 w-full overflow-hidden"
              >
                <ToolCard title={tool_title.text} url={url} />
              </li>
            )
          })}
        </ul>
        <div className="my-6">
          <Pagination
            currentPage={currentPage}
            pageCount={numPages}
            basePath={basePath}
          />
        </div>
      </div>
    </Layout>
  )
}

export const data = graphql`
  query ($skip: Int!, $limit: Int!) {
    allPrismicTool(
      sort: { fields: data___tool_title___text, order: ASC }
      limit: $limit
      skip: $skip
    ) {
      pageInfo {
        currentPage
        pageCount
      }
      nodes {
        prismicId
        url
        data {
          tool_description {
            raw
          }
          tool_logo {
            gatsbyImageData(placeholder: BLURRED)
          }
          tool_title {
            text
          }
        }
      }
    }
  }
`
