import * as React from "react"
import { graphql, Link } from "gatsby"
import Seo from "../components/Seo"
import Layout from "../components/Layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const VideoCard = ({ title, customThumb, thumbnail, url }) => {
  return (
    <article className="p-3">
      <h2 className="my-3 text-green-800 dark:text-green-200 text-xl md:text-2xl xl:text-3xl font-teko text-center">
        {title}
      </h2>
      {customThumb && (
        <div className="aspect-w-16 aspect-h-9">
          <Link to={url}>
            <GatsbyImage
              image={getImage(thumbnail)}
              alt="decorative"
              className="rounded-md"
            />
          </Link>
        </div>
      )}
      {!customThumb && (
        <div className="aspect-w-16 aspect-h-9">
          <Link to={url}>
            <img src={thumbnail} alt="decorative" className="rounded-md" />
          </Link>
        </div>
      )}
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
        <ul className="list-none mx-auto grid md:grid-cols-2 xl:grid-cols-3 place-items-center gap-3 md:gap-4 lg:gap-6">
          {nodes.map(video => {
            const {
              data: {
                video_title,
                video_custom_thumbnail,
                video_embed: { thumbnail_url },
              },
              first_publication_date,
              prismicId,
              url,
            } = video
            let thumbnail = ""
            const customThumb = video_custom_thumbnail.gatsbyImageData !== null
            customThumb
              ? (thumbnail = video_custom_thumbnail)
              : (thumbnail = thumbnail_url)
            return (
              <li
                key={prismicId}
                className="rounded-md shadow-md border-2 border-gray-200 dark:border-gray-600 w-full overflow-hidden"
              >
                <VideoCard
                  title={video_title.text}
                  customThumb={customThumb}
                  thumbnail={thumbnail}
                  url={url}
                />
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
          video_custom_thumbnail {
            alt
            gatsbyImageData(placeholder: BLURRED)
          }
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
