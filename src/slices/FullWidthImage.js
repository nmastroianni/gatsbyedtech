import * as React from "react"
import { graphql } from "gatsby"
// import { RichText } from "prismic-reactjs"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export const FullWidthImage = ({ slice }) => {
  const {
    primary: {
      full_width_image: { gatsbyImageData, alt },
    },
  } = slice
  console.log(alt)
  return (
    <section className=" bg-gray-50">
      <GatsbyImage
        image={getImage(gatsbyImageData)}
        alt={`${alt !== null ? alt : `decorative image`}`}
        imgClassName="aspect-w-16 aspect-h-3"
        className="max-w-7xl mx-auto shadow-sm"
      />
    </section>
  )
}

export const query = graphql`
  fragment HomepageDataBodyFullWidthImage on PrismicHomepageDataBodyFullWidthImage {
    primary {
      full_width_image {
        alt
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
      }
    }
  }
`
