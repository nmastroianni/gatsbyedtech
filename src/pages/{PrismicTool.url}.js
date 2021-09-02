import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SliceZone from "../components/SliceZone"
import { RichText } from "prismic-reactjs"
import htmlSerializer from "../utils/htmlSerializer"

export default function Page({ data, path }) {
  if (!data) return null
  const document = data.tool.data
  return (
    <Layout path={path}>
      <Seo title={document.tool_title.text} />
      <div className="flex justify-center items-center">
        <GatsbyImage
          image={getImage(document.tool_logo.gatsbyImageData)}
          alt={document.tool_logo.alt || "Tool Logo"}
          className="col-span-1 text-center"
        />
      </div>
      <SliceZone sliceZone={document.body} />
    </Layout>
  )
}

export const query = graphql`
  query ToolQuery($id: String) {
    tool: prismicTool(id: { eq: $id }) {
      data {
        tool_title {
          text
        }
        tool_logo {
          alt
          gatsbyImageData(placeholder: BLURRED)
        }
        tool_description {
          raw
        }
        body {
          ... on PrismicSliceType {
            slice_type
          }
          ...ToolDataBodySectionHeading
          ...ToolDataBodyText
          ...ToolDataBodyFullWidthImage
          ...ToolDataBodyImageHighlight
          ...ToolDataBodyContentGrid
        }
      }
    }
  }
`
