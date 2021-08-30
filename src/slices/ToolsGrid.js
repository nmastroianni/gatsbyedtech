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
    <ul className={`grid grid-cols-3 gap-3 p-3 list-none`}>
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
            className="bg-gray-50 rounded-sm dark:bg-gray-800 border-4 dark:border-gray-600 p-3 md:p-4 lg:p-6 flex flex-col items-center font-source cursor-pointer focus focus:outline-none focus:ring-4 focus:ring-green-300"
            key={id}
            onClick={e => {
              e.url = url
              handleClick(e)
            }}
            onKeyDown={e => {
              e.preventDefault()
              console.log(e.key)
              e.url = url
              //handleClick(e)
            }}
          >
            <GatsbyImage
              image={getImage(gatsbyImageData)}
              alt={alt || `${text} logo`}
              className="w-60"
            />
            <h3 className="dark:text-green-200 text-xl md:text-2xl lg:text-3xl my-2 md:my-3 lg:my-6">
              <Link to={url}>
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
