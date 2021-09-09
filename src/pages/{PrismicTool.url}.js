import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SliceZone from "../components/SliceZone"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { linkResolver } from "../utils/linkResolver"

const PrismicTool = ({ data, path }) => {
  if (!data) return null
  const document = data.tool.data
  return (
    <Layout path={path}>
      <Seo title={document.tool_title.text} />
      <header>
        <div className="flex justify-center items-center flex-wrap md:divide-x-4 divide-green-700 py-6">
          <GatsbyImage
            image={getImage(document.tool_logo.gatsbyImageData)}
            alt={document.tool_logo.alt || "Tool Logo"}
            className="col-span-1 text-center rounded w-96 mr-0 md:mr-12"
            imgClassName="rounded"
          />
          <h1 className="text-center pl-0 md:pl-12  w-96 text-6xl text-green-800 dark:text-green-200 font-teko">
            {document.tool_title.text}
          </h1>
        </div>
        <p className="text-center font-teko text-lg text-green-700 dark:text-green-300">
          Last Updated:
        </p>
        <h2 className="mb-3 md:mb-4 lg:mb-6 font-teko text-center text-lg text-green-700 dark:text-green-300">
          {data.tool.last_publication_date}
        </h2>
      </header>
      <SliceZone sliceZone={document.body} />
    </Layout>
  )
}

export const query = graphql`
  query ToolQuery($id: String) {
    tool: prismicTool(id: { eq: $id }) {
      _previewable
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
export default withPrismicPreview(PrismicTool, [
  {
    repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
    linkResolver,
  },
])
