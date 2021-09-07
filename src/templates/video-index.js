import * as React from "react"
import { graphql, Link } from "gatsby"
import { RichText } from "prismic-reactjs"
import htmlSerializer from "../utils/htmlSerializer"
import Seo from "../components/Seo"
import Layout from "../components/Layout"

const VideoCard = ({ title }) => {
  return (
    <article className="rounded-md shadow-md">
      <h2>{title}</h2>
    </article>
  )
}

export default function Videos({
  path,
  pageContext: { currentPage, limit, numVideoPages, totalVideos },
  data: {
    allPrismicVideo: { nodes },
  },
}) {
  return (
    <Layout path={path}>
      <Seo title="Blog" locale="en-US" />
      <div className="mx-auto mb-12 px-3">
        <header className="bg-gray-50 dark:bg-gray-800 mb-2 sm:mb-4 lg:mb-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl py-3 md:py-4 lg:py-6 text-green-800 dark:text-green-100 font-teko">
            EdTech Videos
          </h1>
        </header>
        <ul className="list-none mx-auto grid grid-cols-3">
          {nodes.map(video => {
            const {
              data: { video_title },
              first_publication_date,
              prismicId,
              url,
            } = video
            return (
              <li key={prismicId} className="h-60 w-60">
                <VideoCard title={video_title.text} />
              </li>
            )
          })}
        </ul>
        {/* {numPages > 1 && (
          <Pagination
            path={path}
            numPages={numPages}
            currentPage={currentPage}
            limit={nodes.length}
            totalPosts={totalPosts}
          />
        )} */}
      </div>
    </Layout>
  )
}

export const data = graphql`
  query ($skip: Int!, $limit: Int!) {
    allPrismicVideo(
      sort: { fields: first_publication_date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        url
        prismicId
        first_publication_date(formatString: "MMMM Do, YYYY")
        data {
          video_title {
            text
          }
          video_description {
            raw
          }
          video_embed {
            thumbnail_url
            provider_name
            embed_url
          }
        }
      }
    }
  }
`
