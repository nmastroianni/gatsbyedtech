import * as React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import htmlSerializer from "../utils/htmlSerializer"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export const FullWidthImage = ({ slice }) => {
  const {
    primary: {
      full_width_image: { gatsbyImageData, alt, url },
      full_width_image_caption,
    },
  } = slice
  return (
    <div className="bg-gray-50 dark:bg-gray-700 shadow-sm">
      <div className="text-center bg-gray-50 dark:bg-gray-700">
        <a href={url} className="">
          <GatsbyImage
            image={getImage(gatsbyImageData)}
            alt={`${alt !== null ? alt : `decorative`}`}
          />
        </a>
      </div>
      {full_width_image_caption.richText.length ? (
        <div className="mx-auto bg-gray-50 dark:bg-gray-700  border-gray-800 max-w-screen-lg dark:text-[#d1d5db] p-3 md:p-4 lg:p-6 text-center italic">
          <RichText
            render={full_width_image_caption.richText}
            htmlSerializer={htmlSerializer}
          />
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export const query = graphql`
  fragment HomepageDataBodyFullWidthImage on PrismicHomepageDataBodyFullWidthImage {
    primary {
      full_width_image {
        alt
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        url
      }
      full_width_image_caption {
        richText
      }
    }
  }
  fragment PageDataBodyFullWidthImage on PrismicPageDataBodyFullWidthImage {
    primary {
      full_width_image {
        alt
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        url
      }
      full_width_image_caption {
        richText
      }
    }
  }
  fragment PostDataBodyFullWidthImage on PrismicPostDataBodyFullWidthImage {
    primary {
      full_width_image {
        alt
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        url
      }
      full_width_image_caption {
        richText
      }
    }
  }
  fragment ToolDataBodyFullWidthImage on PrismicToolDataBodyFullWidthImage {
    primary {
      full_width_image {
        alt
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        url
      }
      full_width_image_caption {
        richText
      }
    }
  }
  fragment ChallengeDataBodyFullWidthImage on PrismicChallengeDataBodyFullWidthImage {
    primary {
      full_width_image {
        alt
        gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
        url
      }
      full_width_image_caption {
        richText
      }
    }
  }
`
