import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SliceZone from "../components/SliceZone"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { linkResolver } from "../utils/linkResolver"

const PrismicPost = ({ data, path }) => {
  if (!data) return null
  const document = data.post.data
  console.log(document)
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
      _previewable
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
export default withPrismicPreview(PrismicPost, [
  {
    repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
    linkResolver,
  },
])
