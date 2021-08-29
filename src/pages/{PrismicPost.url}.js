import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SliceZone from "../components/SliceZone"

export default function Post({ data, path }) {
  if (!data) return null
  const document = data.post.data
  return (
    <Layout path={path}>
      <Seo title={document.post_title.text} />
      <div>
        <SliceZone sliceZone={document.body} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PostQuery($id: String) {
    post: prismicPost(id: { eq: $id }) {
      data {
        post_title {
          text
        }
        body {
          ... on PrismicSliceType {
            slice_type
          }
          ...PostDataBodySectionHeading
          ...PostDataBodyText
          ...PostDataBodyFullWidthImage
          ...PostDataBodyImageHighlight
        }
      }
    }
  }
`
