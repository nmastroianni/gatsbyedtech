import * as React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { RichText } from "prismic-reactjs"
import htmlSerializer from "../utils/htmlSerializer"

export const ImageHighlight = ({ slice }) => {
  const {
    primary: {
      image_highlight_heading,
      image_highlight_description,
      image_highlight_image,
      image_highlight_position,
      image_highlight_link,
      image_highlight_link_text,
    },
  } = slice
  if (image_highlight_position) {
    // returns if Position of Image on 2 Col Layout is set to Right
    return (
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center items-center bg-gray-50 dark:bg-gray-800">
          <div className="prose prose-lg md:prose-xl prose-green dark:prose-dark p-3 md:p-4 lg:p-6 w-full dark:text-white">
            <div className="text-center md:text-left">
              <RichText
                render={image_highlight_heading.raw}
                htmlSerializer={htmlSerializer}
              />
            </div>
            <hr />
            <RichText render={image_highlight_description.raw} />

            {image_highlight_link && image_highlight_link_text ? (
              <p className="text-center md:text-left">
                {image_highlight_link.link_type === "Web" ? (
                  <a
                    href={image_highlight_link.url}
                    className="px-6 py-2 rounded-sm md:text-lg text-white hover:text-green-100 bg-green-900 hover:bg-green-800 hover:shadow-md dark:text-green-900 dark:bg-green-200 dark:hover:bg-green-300 focus:outline-none focus:ring-4 focus:ring-green-300"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {image_highlight_link_text.text}
                  </a>
                ) : (
                  <Link href={image_highlight_link.url}>
                    {image_highlight_link_text.text}
                  </Link>
                )}
              </p>
            ) : (
              <></>
            )}
          </div>
          <div className=" p-3 md:p-4 lg:p-6 w-full text-left">
            {image_highlight_link && image_highlight_link.link_type === "Web" && (
              <a href={image_highlight_link.url}>
                <GatsbyImage
                  image={getImage(image_highlight_image.gatsbyImageData)}
                  alt={image_highlight_image.alt || "decorative image"}
                  imgClassName="aspect-w-16 aspect-h-9"
                  className="shadow-sm filter saturate-100 scale-100 transition duration-500 ease-in-out hover:saturate-150 hover:shadow-md transform hover:scale-105"
                />
              </a>
            )}
            {image_highlight_link &&
              image_highlight_link.link_type === "Document" && (
                <Link to={image_highlight_link.url}>
                  <GatsbyImage
                    image={getImage(image_highlight_image.gatsbyImageData)}
                    alt={image_highlight_image.alt || "decorative image"}
                    imgClassName="aspect-w-16 aspect-h-9"
                    className="shadow-sm filter saturate-100 scale-100 transition duration-500 ease-in-out hover:saturate-150 hover:shadow-md transform hover:scale-105"
                  />
                </Link>
              )}
            {!image_highlight_link && (
              <GatsbyImage
                image={getImage(image_highlight_image.gatsbyImageData)}
                alt={image_highlight_image.alt || "decorative image"}
                imgClassName="aspect-w-16 aspect-h-9"
                className="shadow-sm"
              />
            )}
          </div>
        </div>
      </section>
    )
  } else {
    // returns if Position of Image on 2 Col Layout is set to Left
    return (
      <section className="mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center items-center dark:bg-gray-800">
          <div className=" p-3 md:p-4 lg:p-6 w-full text-left">
            <GatsbyImage
              image={getImage(image_highlight_image.gatsbyImageData)}
              alt={image_highlight_image.alt || "decorative image"}
              imgClassName="aspect-w-16 aspect-h-9"
              className="shadow-sm"
            />
          </div>
          <div className="prose prose-lg md:prose-xl prose-green dark:prose-dark p-3 md:p-4 lg:p-6 w-full dark:text-white">
            <div className="text-center md:text-left">
              <RichText
                render={image_highlight_heading.raw}
                htmlSerializer={htmlSerializer}
              />
            </div>
            <hr />
            <RichText render={image_highlight_description.raw} />
            {image_highlight_link && image_highlight_link_text ? (
              <p className="text-center md:text-left">
                {image_highlight_link.link_type === "Web" ? (
                  <a
                    href={image_highlight_link.url}
                    className="px-6 py-2 rounded-sm md:text-lg text-white hover:text-green-100 bg-green-900 hover:bg-green-800 hover:shadow-md dark:text-green-900 dark:bg-green-200 dark:hover:bg-green-300 focus:outline-none focus:ring-4 focus:ring-green-300"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {image_highlight_link_text.text}
                  </a>
                ) : (
                  <Link href={image_highlight_link.url}>
                    {image_highlight_link_text.text}
                  </Link>
                )}
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
    )
  }
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
        link_type
        uid
      }
      image_highlight_link_text {
        text
      }
      image_highlight_position
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
