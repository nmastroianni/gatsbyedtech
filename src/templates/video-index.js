import * as React from "react"
import { graphql, Link } from "gatsby"
import Seo from "../components/Seo"
import Layout from "../components/Layout"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Pagination } from "../components/Pagination"

const VideoCard = ({ title, customThumb, thumbnail, url }) => {
  return (
    <article className="p-3">
      <h2 className="my-3 text-emerald-800 dark:text-emerald-200 text-xl md:text-2xl xl:text-3xl font-teko text-center">
        {title}
      </h2>
      {customThumb && (
        <div className="aspect-w-16 aspect-h-9">
          <Link
            to={url}
            className="rounded-md focus:outline-none focus:ring-4 focus:ring-emerald-300"
          >
            <GatsbyImage
              image={getImage(thumbnail)}
              alt="decorative"
              className="rounded-md"
              imgClassName="rounded-md"
            />
          </Link>
        </div>
      )}
      {!customThumb && (
        <div className="aspect-w-16 aspect-h-9">
          <Link
            to={url}
            className="rounded-md focus:outline-none focus:ring-4 focus:ring-emerald-300"
          >
            <img src={thumbnail} alt="decorative" className="rounded-md" />
          </Link>
        </div>
      )}
    </article>
  )
}

export default function Videos({
  path,
  pageContext: { currentPage, limit, numVideoPages, totalVideos, basePath },
  data: {
    allPrismicVideo: { nodes },
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
        title="Videos"
        locale="en-US"
        description="Explore our video library. We just might have the EdTech tutorial you've been looking for."
      />
      <div className="mx-auto flex flex-col justify-between">
        <header className="bg-gray-50 dark:bg-gray-800 mb-2 sm:mb-4 lg:mb-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl py-3 md:py-4 lg:py-6 text-emerald-800 dark:text-emerald-200 font-teko">
            EdTech Videos
          </h1>
          <h2 className="pb-3 md:pb-4 lg:pb-6 text-xl md:text-2xl lg:text-3xl text-emerald-700 dark:text-emerald-100 font-teko">
            Page {currentPage} of {numVideoPages}
          </h2>
        </header>
        <div className="my-6">
          <Pagination
            currentPage={currentPage}
            pageCount={numVideoPages}
            basePath="/videos"
          />
        </div>
        <ul className="list-none mx-auto grid md:grid-cols-2 xl:grid-cols-3 place-items-center gap-3 md:gap-4 lg:gap-6">
          {nodes.map(video => {
            const {
              data: {
                video_title,
                video_custom_thumbnail,
                video_embed: { thumbnail_url },
              },
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
                className="group rounded-md border-4 border-gray-200 dark:border-gray-600 w-full overflow-hidden"
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
        <div className="my-6">
          <Pagination
            currentPage={currentPage}
            pageCount={numVideoPages}
            basePath="/videos"
          />
        </div>
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
            richText
          }
          video_embed {
            thumbnail_url
            provider_name
            embed_url
          }
        }
      }
      pageInfo {
        currentPage
        pageCount
      }
    }
  }
`
