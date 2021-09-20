import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SliceZone from "../components/SliceZone"
import {
  withPrismicPreview,
  useMergePrismicPreviewData,
} from "gatsby-plugin-prismic-previews"
import { linkResolver } from "../utils/linkResolver"

const PrismicPage = ({ data, path }) => {
  const queryData = useMergePrismicPreviewData(data)
  if (!data) return null
  const document = queryData.data.page.data
  return (
    <Layout path={path}>
      <Seo title={document.page_title.text} />
      <div>
        <h1 className="font-teko text-4xl md:text-5xl lg:text-7xl text-center py-3 md:py-4 lg:py-6 border-b-2 text-green-800 dark:text-green-200">
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
      _previewable
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
  }
`
export default withPrismicPreview(PrismicPage, [
  {
    repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
    linkResolver,
  },
])
