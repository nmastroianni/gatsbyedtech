import * as React from "react"
import { graphql, Link } from "gatsby"
import { RichText } from "prismic-reactjs"
import htmlSerializer from "../utils/htmlSerializer"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { CgWebsite } from "react-icons/cg"

export const ContentGrid = ({ slice }) => {
  const { items } = slice
  return (
    <ul
      className={`max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 p-3 list-none`}
    >
      {items.map(item => {
        if (item.content_items.type === "tool") {
          const {
            content_items: {
              id,
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
              className="bg-gray-50 rounded-sm shadow-sm dark:shadow-none dark:bg-gray-800 border-4 dark:border-gray-600 p-3 md:p-4 lg:p-6 flex flex-col items-center font-source place-content-center"
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
          const {
            content_items: {
              id,
              url,
              document: {
                data: {
                  post_excerpt: { raw },
                  post_authors,
                  post_featured_image,
                },
              },
            },
          } = item

          return (
            <li
              className="bg-gray-50 rounded-sm shadow-sm dark:shadow-none dark:bg-gray-800 border-4 dark:border-gray-600 p-3 md:p-4 lg:p-6 flex flex-col items-center font-source place-content-center"
              key={id}
            >
              <GatsbyImage
                image={getImage(post_featured_image.gatsbyImageData)}
                alt={post_featured_image.alt || "Decorative Image"}
                className="w-3/4"
              />
              <div className="prose dark:prose-dark w-full">
                <RichText render={raw} htmlSerializer={htmlSerializer} />
              </div>
              <div className="w-full mt-auto flex justify-between items-center">
                <div>
                  {post_authors.map(author => {
                    const {
                      post_authors_author: {
                        document: {
                          id,
                          data: { author_profile_image, author_title },
                        },
                      },
                    } = author
                    return (
                      <GatsbyImage
                        image={getImage(author_profile_image.gatsbyImageData)}
                        alt="author profile"
                        className="w-8 h-8 rounded-full mr-2 filter grayscale transition duration-300 ease-in-out hover:grayscale-0"
                        title={`Authored by: ${author_title.text}`}
                        key={id}
                      />
                    )
                  })}
                </div>
                <Link
                  to={url}
                  className="inline px-4 py-3 border-2 dark:text-green-200 border-green-800 dark:border-green-400 rounded-md hover:shadow-md transition duration-300 ease-in-out hover:bg-green-200 hover:bg-opacity-20 dark:hover:bg-black dark:hover:bg-opacity-70 focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                  Take a Look
                </Link>
              </div>
            </li>
          )
        } else if (item.content_items.type === "page") {
          const {
            content_items: {
              id,
              url,
              document: {
                data: {
                  page_title: { text },
                },
              },
            },
          } = item
          return (
            <li
              className="bg-gray-50 rounded-sm shadow-sm dark:shadow-none dark:bg-gray-800 border-4 dark:border-gray-600 p-3 md:p-4 lg:p-6 flex flex-col items-center font-source place-content-center"
              key={id}
            >
              <CgWebsite className="w-24 h-24 text-green-800 dark:text-green-200" />
              <p className="prose dark:prose-dark prose-md md:prose-lg">
                Check out the page below!
              </p>
              <h3 className="text-green-800 dark:text-green-200 my-2 md:my-3 lg:my-6">
                <Link
                  to={url}
                  className="mt-auto block px-4 py-3 border-2 border-green-800 dark:border-green-400 rounded-md hover:shadow-md hover:bg-green-200 hover:bg-opacity-20 dark:hover:bg-black dark:hover:bg-opacity-70 focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                  <span className="sr-only">Visit the page </span>
                  {text}
                </Link>
              </h3>
            </li>
          )
        } else if (item.content_items.type === "video") {
          const {
            content_items: {
              id,
              url,
              document: {
                data: {
                  video_description: { raw },
                  video_embed: { title, thumbnail_url },
                  video_title: { text },
                },
              },
            },
          } = item
          return (
            <li
              className="bg-gray-50 rounded-sm shadow-sm dark:shadow-none dark:bg-gray-800 border-4 dark:border-gray-600 p-3 md:p-4 lg:p-6 flex flex-col items-center font-source place-content-center"
              key={id}
            >
              <h3 className="text-green-800 dark:text-green-200 my-2 md:my-3 lg:my-6 text-xl md:text-2xl">
                {text}
              </h3>
              <div className="p-3 md:p-4 bg-gray-200 dark:bg-gray-900 rounded-md shadow-sm group transition duration-500 ease-in-out hover:saturate-150 hover:shadow-md transform hover:scale-105">
                <Link
                  to={url}
                  className="block rounded-md focus:outline-none focus:ring-4 focus:ring-green-300"
                >
                  <img
                    src={thumbnail_url}
                    alt={`thumbnail for the video titled ${title}`}
                    className="w-full max-w-lg rounded-md "
                  />
                </Link>
              </div>

              <div className="prose dark:prose-dark prose-sm italic mt-2 md:mt-3 lg:mt-6">
                <RichText render={raw} htmlSerializer={htmlSerializer} />
              </div>
            </li>
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
              post_authors {
                post_authors_author {
                  raw
                  document {
                    ... on PrismicAuthor {
                      id
                      data {
                        author_title {
                          text
                        }
                        author_profile_image {
                          gatsbyImageData(placeholder: BLURRED)
                        }
                      }
                    }
                  }
                }
              }
              post_featured_image {
                alt
                gatsbyImageData(placeholder: BLURRED)
              }
              post_excerpt {
                raw
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
  fragment ToolDataBodyContentGrid on PrismicToolDataBodyContentGrid {
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
              post_authors {
                post_authors_author {
                  raw
                  document {
                    ... on PrismicAuthor {
                      id
                      data {
                        author_title {
                          text
                        }
                        author_profile_image {
                          gatsbyImageData(placeholder: BLURRED)
                        }
                      }
                    }
                  }
                }
              }
              post_featured_image {
                alt
                gatsbyImageData(placeholder: BLURRED)
              }
              post_excerpt {
                raw
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
