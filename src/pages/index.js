import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SliceZone from "../components/SliceZone"
import Hero from "../components/Hero"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { linkResolver } from "../utils/linkResolver"

const PrismicHomepage = ({ data, path }) => {
  if (!data) return null
  const document = data.homepage.data
  const { banner_description, banner_image, banner_link_label, banner_title } =
    document
  return (
    <Layout path={path}>
      <Seo title="Home" />
      <Hero
        heroImage={banner_image}
        bannerTitle={banner_title.text}
        bannerDescription={banner_description.text}
        bannerLinkLabel={banner_link_label.text}
      />
      <div>
        <SliceZone sliceZone={document.body} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query MyQuery {
    homepage: prismicHomepage {
      _previewable
      data {
        banner_description {
          text
        }
        banner_image {
          alt
          gatsbyImageData(placeholder: BLURRED)
        }
        banner_link_label {
          text
        }
        banner_title {
          text
        }
        body {
          ... on PrismicSliceType {
            slice_type
          }
          ...HomepageDataBodyFullWidthImage
          ...HomepageDataBodyImageHighlight
          ...HomepageDataBodySectionHeading
          ...HomepageDataBodyText
          ...HomepageDataBodyContentGrid
          ...HomepageDataBodyYoutubeHighlight
        }
      }
    }
  }
`
export default withPrismicPreview(PrismicHomepage, [
  {
    repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
    linkResolver,
  },
])
