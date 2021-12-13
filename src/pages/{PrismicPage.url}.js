import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SliceZone from "../components/SliceZone"

const PrismicPage = ({ data, path }) => {
  if (!data) return null
  const document = data.page.data
  return (
    <Layout path={path}>
      <Seo
        title={document.page_title.text}
        description={`Check out our page about ${document.page_title.text}.`}
        url={`${data.site.siteMetadata.siteUrl}${data.page.url}`}
      />
      <div>
        <h1 className="font-teko text-4xl md:text-5xl lg:text-7xl text-center py-3 md:py-4 lg:py-6 border-b-2 text-emerald-800 dark:text-emerald-200">
          {document.page_title.text}
        </h1>
        <SliceZone sliceZone={document.body} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PageQuery($id: String) {
    page: prismicPage(id: { eq: $id }) {
      url
      data {
        page_title {
          text
        }
        body {
          ... on PrismicSliceType {
            slice_type
          }
          ...PageDataBodySectionHeading
          ...PageDataBodyText
          ...PageDataBodyFullWidthImage
          ...PageDataBodyImageHighlight
          ...PageDataBodyYoutubeHighlight
          ...PageDataBodyContentGrid
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
export default PrismicPage
