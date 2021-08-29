import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SliceZone from "../components/SliceZone"

export default function Page({ data, path }) {
  if (!data) return null
  const document = data.page.data
  return (
    <Layout path={path}>
      <Seo title={document.page_title.text} />
      <div>
        <SliceZone sliceZone={document.body} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PageQuery($id: String) {
    page: prismicPage(id: { eq: $id }) {
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
        }
      }
    }
  }
`
