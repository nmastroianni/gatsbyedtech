import * as React from "react"
import { graphql, Link, navigate } from "gatsby"
import { RichText } from "prismic-reactjs"
import htmlSerializer from "../utils/htmlSerializer"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export const ToolsGrid = ({ slice }) => {
  const { items } = slice
  const toolCount = items.length
  const handleClick = e => {
    navigate(e.url)
  }
  return (
    <ul
      className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 p-3 list-none`}
    >
      {items.map(item => {
        const {
          tools_grid_tool: {
            id,
            raw,
            slug,
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
      })}
    </ul>
  )
}

export const query = graphql`
  fragment HomepageDataBodyToolGrid on PrismicHomepageDataBodyToolGrid {
    items {
      tools_grid_tool {
        url
        link_type
        raw
        slug
        id
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
        }
      }
    }
  }
`
