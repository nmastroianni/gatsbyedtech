import * as React from "react"
import { graphql, Link } from "gatsby"
import { RichText } from "prismic-reactjs"
import htmlSerializer from "../utils/htmlSerializer"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export const ContentGrid = ({ slice }) => {
  const { items } = slice
  return (
    <ul
      className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 p-3 list-none`}
    >
      {items.map(item => {
        console.log(item)
        if (item.content_items.type === "tool") {
          const {
            content_items: {
              id,
              type,
              url,
              document: {
                data: {
                  tool_description,
                  tool_title: { text },
                  tool_logo: { alt, gatsbyImageData },
                },
              },
            },
          } = item
          return (
            <li
              className="bg-gray-50 rounded-sm shadow-sm dark:shadow-none dark:bg-gray-800 border-4 dark:border-gray-600 p-3 md:p-4 lg:p-6 flex flex-col items-center font-source"
              key={id}
            >
              <GatsbyImage
                image={getImage(gatsbyImageData)}
                alt={alt || `${text} logo`}
                className="w-40"
              />
              <h3 className="text-green-800 dark:text-green-200 my-2 md:my-3 lg:my-6">
                <Link
                  to={url}
                  className="mt-auto block px-4 py-3 border-2 border-green-800 dark:border-green-400 rounded-md hover:shadow-md hover:bg-green-200 hover:bg-opacity-20 dark:hover:bg-black dark:hover:bg-opacity-70 focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                  <span className="sr-only">Learn More About </span>
                  {text}
                </Link>
              </h3>
              <div className="prose dark:prose-dark prose-lg md:prose-xl">
                <RichText
                  render={tool_description.raw}
                  htmlSerializer={htmlSerializer}
                />
              </div>
            </li>
          )
        } else if (item.content_items.type === "post") {
          return (
            <>
              <h2>Post</h2>
            </>
          )
        } else if (item.content_items.type === "page") {
          return (
            <>
              <h2>Page</h2>
            </>
          )
        } else if (item.content_items.type === "video") {
          return (
            <>
              <h2>Video</h2>
            </>
          )
        } else {
          return <></>
        }
      })}
    </ul>
  )
}

export const query = graphql`
  fragment HomepageDataBodyContentGrid on PrismicHomepageDataBodyContentGrid {
    items {
      content_items {
        url
        link_type
        raw
        slug
        id
        type
        document {
          ... on PrismicTool {
            id
            data {
              tool_description {
                raw
              }
              tool_title {
                text
              }
              tool_logo {
                gatsbyImageData(placeholder: BLURRED)
                alt
              }
            }
          }
          ... on PrismicPost {
            id
            data {
              post_excerpt {
                raw
              }
              post_title {
                raw
              }
              post_featured_image {
                gatsbyImageData(placeholder: BLURRED)
              }
            }
            url
          }
          ... on PrismicVideo {
            id
            url
            data {
              video_description {
                raw
              }
              video_embed {
                embed_url
                title
                thumbnail_url
              }
              video_title {
                text
              }
            }
          }
          ... on PrismicPage {
            id
            url
            data {
              page_title {
                text
              }
            }
          }
        }
      }
    }
  }
`
