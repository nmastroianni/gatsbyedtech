import * as React from "react"
import { graphql, Link } from "gatsby"
import Seo from "../components/Seo"
import Layout from "../components/Layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Pagination } from "../components/Pagination"

const ToolCard = ({ title, url, image }) => {
  return (
    <>
      <article className="group">
        <div>
          <Link to={url}>
            <GatsbyImage
              image={getImage(image.gatsbyImageData)}
              alt={`logo for ${title.text}`}
              className="rounded w-52 md:w-full"
              imgClassName="rounded"
            />
          </Link>
        </div>
      </article>
      <p className="text-center font-teko my-2 md:my-3 lg:my-4 text-2xl text-emerald-800 dark:text-emerald-200">
        {title}
      </p>
    </>
  )
}

export default function Tools({
  path,
  pageContext: { currentPage, limit, numPages, basePath },
  data: {
    allPrismicTool: { nodes },
  },
}) {
  const canonical =
    currentPage === 1
      ? `https://edtechwave.com${basePath}/`
      : `https://edtechwave.com${basePath}/${currentPage}/`
  return (
    <Layout path={path}>
      <Seo
        url={canonical}
        title="Tools"
        locale="en-US"
        description="There are many EdTech tools out there. Take a look at some of the ones we think are great."
      />
      <div className="mx-auto flex flex-col justify-between ">
        <header className="bg-gray-50 dark:bg-gray-800 mb-2 sm:mb-4 lg:mb-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl py-3 md:py-4 lg:py-6 text-emerald-800 dark:text-emerald-200 font-teko">
            EdTech Tools
          </h1>
          <h2 className="pb-3 md:pb-4 lg:pb-6 text-xl md:text-2xl lg:text-3xl text-emerald-700 dark:text-emerald-100 font-teko">
            Page {currentPage} of {numPages}
          </h2>
        </header>
        <div className="my-6">
          {numPages > 1 ? (
            <Pagination
              currentPage={currentPage}
              pageCount={numPages}
              basePath={basePath}
            />
          ) : (
            ""
          )}
        </div>
        <ul className="max-w-screen-sm lg:max-w-screen-md list-none mx-auto grid md:grid-cols-2 xl:grid-cols-3 place-items-center gap-3 md:gap-4 lg:gap-6">
          {nodes.map(tool => {
            const {
              data: { tool_description, tool_logo, tool_title },

              prismicId,
              url,
            } = tool

            return (
              <li key={prismicId} className="p-8 rounded overflow-hidden">
                <ToolCard
                  title={tool_title.text}
                  url={url}
                  description={tool_description}
                  image={tool_logo}
                />
              </li>
            )
          })}
        </ul>
        <div className="my-6">
          {numPages > 1 ? (
            <Pagination
              currentPage={currentPage}
              pageCount={numPages}
              basePath={basePath}
            />
          ) : (
            ""
          )}
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
            richText
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
