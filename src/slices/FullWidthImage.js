import * as React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import htmlSerializer from "../utils/htmlSerializer"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export const FullWidthImage = ({ slice }) => {
  const {
    primary: {
      full_width_image: { gatsbyImageData, alt },
      full_width_image_caption,
    },
  } = slice
  return (
    <>
      <section className=" bg-gray-50 shadow-sm">
        <GatsbyImage
          image={getImage(gatsbyImageData)}
          alt={`${alt !== null ? alt : `decorative image`}`}
          imgClassName=""
          className="max-w-7xl mx-auto"
        />
      </section>
      <div className="mx-auto prose prose-lg md:prose-xl p-3 md:p-4 lg:p-6">
        <RichText
          render={full_width_image_caption.raw}
          htmlSerializer={htmlSerializer}
        />
      </div>
    </>
  )
}

export const query = graphql`
  fragment HomepageDataBodyFullWidthImage on PrismicHomepageDataBodyFullWidthImage {
    primary {
      full_width_image {
        alt
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
      }
      full_width_image_caption {
        raw
      }
    }
  }
`
