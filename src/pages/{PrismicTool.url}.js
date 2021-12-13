import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SliceZone from "../components/SliceZone"

const PrismicTool = ({ data, path }) => {
  if (!data) return null
  const document = data.tool.data
  const canonical = `${data.site.siteMetadata.siteUrl}${data.tool.url}`
  return (
    <Layout path={path}>
      <Seo
        url={canonical}
        title={document.tool_title.text}
        description={document.tool_description.text}
        image={getSrc(document.tool_logo.gatsbyImageData)}
      />
      <header>
        <div className="flex flex-col justify-center items-center md:flex-row md:divide-x-4 divide-emerald-700 dark:divide-emerald-200 py-6">
          <GatsbyImage
            image={getImage(document.tool_logo.gatsbyImageData)}
            alt={document.tool_logo.alt || "Tool Logo"}
            className="col-span-1 text-center rounded w-96 mr-0 md:mr-12"
            imgClassName="rounded"
          />
          <div className="my-4 md:my-0">
            <h1 className="text-center pl-0 md:pl-12  w-96 text-6xl text-emerald-800 dark:text-white font-teko">
              {document.tool_title.text}
            </h1>
            <p className="text-sm text-center pl-0 md:pl-12 font-source text-emerald-700 dark:text-emerald-200">
              Last Updated:
            </p>
            <p className="text-sm pl-0 md:pl-12 mb-3 md:mb-4 lg:mb-6 text-center text-emerald-700 dark:text-emerald-200">
              {data.tool.last_publication_date}
            </p>
          </div>
        </div>
      </header>
      <SliceZone sliceZone={document.body} />
    </Layout>
  )
}

export const query = graphql`
  query ToolQuery($id: String) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    tool: prismicTool(id: { eq: $id }) {
      url
      last_publication_date(formatString: "MMMM Do, YYYY")
      data {
        tool_title {
          text
        }
        tool_logo {
          alt
          gatsbyImageData(placeholder: BLURRED)
        }
        tool_description {
          richText
          text
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
          ...ToolDataBodyYoutubeHighlight
        }
      }
    }
  }
`
export default PrismicTool
