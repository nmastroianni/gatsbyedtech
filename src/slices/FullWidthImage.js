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
  console.log(full_width_image_caption);
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
      {full_width_image_caption.raw.length ? (<div className="mx-auto bg-gray-50 dark:bg-gray-700  border-gray-800 prose prose-sm md:prose-lg dark:prose-dark p-3 md:p-4 lg:p-6 text-center italic">
        <RichText
          render={full_width_image_caption.raw}
          htmlSerializer={htmlSerializer}
        />
      </div>): ''}
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
        raw
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
        raw
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
        raw
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
        raw
      }
    }
  }
`
