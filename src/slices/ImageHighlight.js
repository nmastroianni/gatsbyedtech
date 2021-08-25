import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { RichText } from "prismic-reactjs"
import htmlSerializer from "../utils/htmlSerializer"

export const ImageHighlight = ({ slice }) => {
  return (
    <section className="mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center items-center bg-gray-50 dark:bg-gray-800">
        <div className="prose prose-xl prose-green dark:prose-dark w-full dark:text-white">
          <RichText
            render={slice.primary.image_highlight_heading.raw}
            htmlSerializer={htmlSerializer}
          />
          <hr />
          <RichText render={slice.primary.image_highlight_description.raw} />
          {/* <p>
            <Link to={slice.primary.link.url}>
                {RichText.asText(slice.primary.link_label.raw)}
              </Link>
          </p> */}
        </div>
        <div className=" py-3 md:py-4 lg:py-6 w-full text-left">
          <GatsbyImage
            image={getImage(
              slice.primary.image_highlight_image.gatsbyImageData
            )}
            alt={slice.primary.image_highlight_image.alt}
            imgClassName="aspect-w-16 aspect-h-9"
            className="shadow-sm"
          />
        </div>
      </div>
    </section>
  )
}

export const query = graphql`
  fragment HomepageDataBodyImageHighlight on PrismicHomepageDataBodyImageHighlight {
    primary {
      image_highlight_image {
        alt
        gatsbyImageData(placeholder: BLURRED)
      }
      image_highlight_heading {
        raw
      }
      image_highlight_description {
        raw
      }
      image_highlight_link {
        url
        type
        uid
      }
      image_highlight_link_text {
        raw
      }
    }
  }
`
// fragment PageDataBodyImageHighlight on PrismicPageDataBodyImageHighlight {
//     primary {
//       featured_image {
//         url
//         alt
//       }
//       title {
//         raw
//       }
//       description {
//         raw
//       }
//       link {
//         url
//         type
//         uid
//       }
//       link_label {
//         raw
//       }
//     }
//   }
