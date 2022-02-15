import * as React from "react"
import { graphql, Link, navigate } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Seo from "../components/Seo"
import Layout from "../components/Layout"
import { Pagination } from "../components/Pagination"

export default function Challenges({
  path,
  pageContext: { currentPage, numPages, basePath },
  data: {
    allPrismicChallenge: { nodes },
  },
}) {
  console.log(nodes[0].data.challenge_featured_image)
  const canonical =
    currentPage === 1
      ? `https://edtechwave.com${basePath}/`
      : `https://edtechwave.com${basePath}/${currentPage}/`
  return (
    <Layout path={path}>
      <Seo
        title="Challenges"
        url={canonical}
        image={
          nodes[0].data.challenge_featured_image.gatsbyImageData.images.fallback
            .src
        }
        description="Feeling up for a challenge? Take a look at our growing library of challenges. It's never too late to start learning."
      />
      <div className="mx-auto">
        <header className="bg-gray-50 dark:bg-gray-800 mb-2 sm:mb-4 lg:mb-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl py-3 md:py-4 lg:py-6 text-emerald-800 dark:text-emerald-100 font-teko">
            Challenges
          </h1>
          {numPages > 1 ? (
            <p className="pb-3 md:pb-4 lg:pb-6 text-xl md:text-2xl lg:text-3xl text-emerald-700 dark:text-emerald-100 font-teko">
              Page {currentPage} of {numPages}
            </p>
          ) : null}
        </header>
        {numPages > 1 ? (
          <div className="my-6">
            <Pagination
              currentPage={currentPage}
              pageCount={numPages}
              basePath="/blog"
            />
          </div>
        ) : null}
        <ul className="list-none max-w-screen-md mx-auto space-y-3 md:space-y-4 lg:space-y-6 py-3 md:py-4 lg:py-6">
          {nodes.map(node => {
            return (
              <li className="rounded border text-center pb-3 md:pb-4 lg:pb-6 shadow shadow-emerald-100 transition ease-in-out duration-500 lg:hover:-rotate-1 lg:hover:scale-105">
                <GatsbyImage
                  image={getImage(node.data.challenge_featured_image)}
                  alt={``}
                  onClick={() => navigate(node.url)}
                  className="cursor-pointer rounded-t"
                />
                <h2 className="font-teko my-3 md:my-4 lg:my-6 text-center text-emerald-900 dark:text-emerald-200 text-3xl md:text-4xl lg:text-5xl">
                  {node.data.title.text}
                </h2>
                <Link
                  to={node.url}
                  title="View the Challenge"
                  className="rounded px-3 py-2 bg-emerald-800 text-emerald-50 dark:bg-emerald-200 dark:text-emerald-800 hover:text-white hover:bg-emerald-900 dark:hover:text-emerald-900 dark:hover:bg-emerald-100"
                >
                  View the Challenge
                </Link>
              </li>
            )
          })}
        </ul>
        {numPages > 1 ? (
          <div className="my-6">
            <Pagination
              currentPage={currentPage}
              pageCount={numPages}
              basePath="/blog"
            />
          </div>
        ) : null}
      </div>
    </Layout>
  )
}

export const data = graphql`
  query ($skip: Int!, $limit: Int!) {
    allPrismicChallenge(
      sort: { fields: first_publication_date, order: DESC }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        url
        prismicId
        last_publication_date(formatString: "MMMM, Do YYYY")
        data {
          title {
            text
          }
          challenge_featured_image {
            gatsbyImageData
            alt
          }
        }
      }
    }
  }
`
