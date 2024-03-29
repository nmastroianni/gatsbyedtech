import * as React from "react"
import { graphql, Link } from "gatsby"
import { RichText } from "prismic-reactjs"
import htmlSerializer from "../utils/htmlSerializer"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { CgWebsite } from "react-icons/cg"
import { HiTag } from "react-icons/hi"

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
              className="bg-gray-50 rounded-sm shadow-sm dark:shadow-none dark:bg-gray-800 border-4 border-gray-200 dark:border-gray-600 p-3 md:p-4 lg:p-6 flex flex-col items-center  place-content-center"
              key={id}
            >
              <GatsbyImage
                image={getImage(gatsbyImageData)}
                alt={alt || `${text} logo`}
                className="w-40"
              />
              <h3 className="text-emerald-800 dark:text-emerald-200 my-2 md:my-3 lg:my-6">
                <Link
                  to={url}
                  className="mt-auto block px-4 py-3 border-2 border-emerald-800 dark:border-emerald-400 rounded-md hover:shadow-md hover:bg-emerald-200 hover:bg-opacity-20 dark:hover:bg-black dark:hover:bg-opacity-70 focus:outline-none focus:ring-4 focus:ring-emerald-300"
                >
                  <span className="sr-only">Learn More About </span>
                  {text}
                </Link>
              </h3>
              <div className="prose dark:prose-dark prose-lg md:prose-xl mt-auto">
                <RichText
                  render={tool_description.richText}
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
                  post_excerpt: { richText },
                  post_authors,
                  post_featured_image,
                  post_title: { text },
                  tags,
                },
              },
            },
          } = item

          return (
            <li
              className="bg-gray-50 rounded-sm shadow-sm dark:shadow-none dark:bg-gray-800 border-4 dark:border-gray-600 p-3 md:p-4 lg:p-6 flex flex-col items-center  place-content-center"
              key={id}
            >
              <GatsbyImage
                image={getImage(post_featured_image.gatsbyImageData)}
                alt={post_featured_image.alt || ""}
                className="w-3/4"
              />
              <div className="prose dark:prose-dark w-full">
                <h2 className="text-center dark:text-white">{text}</h2>
                <RichText render={richText} htmlSerializer={htmlSerializer} />
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
                        className="w-8 h-8 rounded-full mr-2 filter grayscale transition duration-300 ease-in-out hover:grayscale-0 hover:scale-110"
                        title={`Authored by: ${author_title.text}`}
                        key={id}
                      />
                    )
                  })}
                </div>
                <Link
                  to={url}
                  className="inline px-4 py-3 border-2 dark:text-emerald-200 border-emerald-800 dark:border-emerald-400 rounded-md hover:shadow-md transition duration-300 ease-in-out hover:bg-emerald-200 hover:bg-opacity-20 dark:hover:bg-black dark:hover:bg-opacity-70 focus:outline-none focus:ring-4 focus:ring-emerald-300"
                >
                  Take a Look
                </Link>
              </div>
              {tags.length ? (
                <div className="place-self-start">
                  <ul className="grid grid-flow-col gap-1 divide-x-2 divide-emerald-600 dark:divide-slate-500 text-sm text-emerald-800 dark:text-emerald-100">
                    {tags.map(tag => {
                      return (
                        <li
                          className="pl-1 hover:scale-105"
                          key={tag.tag.document.id}
                        >
                          <Link to={tag.tag.url} className="hover:underline">
                            <HiTag className="w-4 h-4 inline" />
                            {tag.tag.document.data.title.text}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ) : null}
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
              className="bg-gray-50 rounded-sm shadow-sm dark:shadow-none dark:bg-gray-800 border-4 dark:border-gray-600 p-3 md:p-4 lg:p-6 flex flex-col items-center  place-content-center"
              key={id}
            >
              <CgWebsite className="w-24 h-24 text-emerald-800 dark:text-emerald-200" />
              <p className="prose dark:prose-dark prose-md md:prose-lg">
                Check out the page below!
              </p>
              <h3 className="text-emerald-800 dark:text-emerald-200 my-2 md:my-3 lg:my-6">
                <Link
                  to={url}
                  className="mt-auto block px-4 py-3 border-2 border-emerald-800 dark:border-emerald-400 rounded-md hover:shadow-md hover:bg-emerald-200 hover:bg-opacity-20 dark:hover:bg-black dark:hover:bg-opacity-70 focus:outline-none focus:ring-4 focus:ring-emerald-300"
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
                  video_custom_thumbnail,
                  video_description: { richText },
                  video_embed: { title, thumbnail_url },
                  video_title: { text },
                },
              },
            },
          } = item
          return (
            <li
              className="bg-gray-50 rounded-sm shadow-sm dark:shadow-none dark:bg-gray-800 border-4 dark:border-gray-600 p-3 md:p-4 lg:p-6 flex flex-col items-center  place-content-center"
              key={id}
            >
              <h3 className="text-emerald-800 dark:text-emerald-200 my-2 md:my-3 lg:my-6 text-xl md:text-2xl text-center">
                {text}
              </h3>
              <div className="p-3 md:p-4 bg-gray-200 dark:bg-gray-900 rounded-md shadow-sm group transition duration-500 ease-in-out hover:saturate-150 hover:shadow-md transform hover:scale-105">
                {video_custom_thumbnail.gatsbyImageData && (
                  <Link
                    to={url}
                    className="block rounded-md focus:outline-none focus:ring-4 focus:ring-emerald-300"
                  >
                    <GatsbyImage
                      image={getImage(video_custom_thumbnail.gatsbyImageData)}
                      alt={`thumbnail for the video titled ${title}`}
                      className="w-full max-w-lg rounded-md "
                    />
                  </Link>
                )}
                {!video_custom_thumbnail.gatsbyImageData && (
                  <Link
                    to={url}
                    className="block rounded-md focus:outline-none focus:ring-4 focus:ring-emerald-300"
                  >
                    <img
                      src={thumbnail_url}
                      alt={`thumbnail for the video titled ${title}`}
                      className="w-full max-w-lg rounded-md "
                    />
                  </Link>
                )}
              </div>

              <div className="prose dark:prose-dark prose-sm italic mt-2 md:mt-3 lg:mt-6">
                <RichText render={richText} htmlSerializer={htmlSerializer} />
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
                richText
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
              post_title {
                text
              }
              tags {
                tag {
                  url
                  document {
                    ... on PrismicTag {
                      id
                      data {
                        title {
                          text
                        }
                      }
                    }
                  }
                }
              }
              post_excerpt {
                richText
              }
            }
            url
          }
          ... on PrismicVideo {
            id
            url
            data {
              video_custom_thumbnail {
                alt
                gatsbyImageData
              }
              video_description {
                richText
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
                richText
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
                richText
              }
            }
            url
          }
          ... on PrismicVideo {
            id
            url
            data {
              video_custom_thumbnail {
                alt
                gatsbyImageData
              }
              video_description {
                richText
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
  fragment PageDataBodyContentGrid on PrismicPageDataBodyContentGrid {
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
                richText
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
                richText
              }
            }
            url
          }
          ... on PrismicVideo {
            id
            url
            data {
              video_custom_thumbnail {
                alt
                gatsbyImageData
              }
              video_description {
                richText
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
  fragment PostDataBodyContentGrid on PrismicPostDataBodyContentGrid {
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
                richText
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
                richText
              }
            }
            url
          }
          ... on PrismicVideo {
            id
            url
            data {
              video_custom_thumbnail {
                alt
                gatsbyImageData
              }
              video_description {
                richText
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
