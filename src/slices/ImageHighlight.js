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
            <hr className="mb-0" />
            <RichText
              render={image_highlight_description.raw}
              htmlSerializer={htmlSerializer}
            />

            {image_highlight_link.url !== null && image_highlight_link_text ? (
              <p className="text-center md:text-left">
                {image_highlight_link.link_type === "Web" ? (
                  <a
                    href={image_highlight_link.url}
                    className="px-6 py-2 rounded-sm md:text-lg lg:text-xl hover:bg-green-700 hover:shadow-md hover:text-white border-3 border-2 border-green-800 dark:border-green-500 dark:hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-300"
                    style={{ textDecoration: "none" }}
                  >
                    {image_highlight_link_text.text}
                  </a>
                ) : (
                  <Link
                    href={image_highlight_link.url}
                    className="px-6 py-2 rounded-sm md:text-lg lg:text-xl hover:bg-green-700 hover:shadow-md hover:text-white border-3 border-2 border-green-800 dark:border-green-500 dark:hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-300"
                  >
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
                  className="shadow-sm rounded-sm filter saturate-100 scale-100 transition duration-500 ease-in-out hover:saturate-150 hover:shadow-md transform hover:scale-105"
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
                    className="shadow-sm rounded-sm filter saturate-100 scale-100 transition duration-500 ease-in-out hover:saturate-150 hover:shadow-md transform hover:scale-105"
                  />
                </Link>
              )}
            {!image_highlight_link && (
              <GatsbyImage
                image={getImage(image_highlight_image.gatsbyImageData)}
                alt={image_highlight_image.alt || "decorative image"}
                imgClassName="aspect-w-16 aspect-h-9"
                className="shadow-sm rounded-sm"
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
            <RichText
              render={image_highlight_description.raw}
              htmlSerializer={htmlSerializer}
            />
            {image_highlight_link.url !== null && image_highlight_link_text ? (
              <p className="text-center md:text-left">
                {image_highlight_link.link_type === "Web" ? (
                  <a
                    href={image_highlight_link.url}
                    className="px-6 py-2 rounded-sm md:text-lg lg:text-xl hover:bg-green-700 hover:shadow-md hover:text-white border-3 border-2 border-green-800 dark:border-green-500 dark:hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-300"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    {image_highlight_link_text.text}
                  </a>
                ) : (
                  <Link
                    href={image_highlight_link.url}
                    className="px-6 py-2 rounded-sm md:text-lg lg:text-xl hover:bg-green-700 hover:shadow-md hover:text-white border-3 border-2 border-green-800 dark:border-green-500 dark:hover:bg-green-900 focus:outline-none focus:ring-4 focus:ring-green-300"
                  >
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

  fragment PageDataBodyImageHighlight on PrismicPageDataBodyImageHighlight {
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

  fragment PostDataBodyImageHighlight on PrismicPostDataBodyImageHighlight {
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
  fragment ToolDataBodyImageHighlight on PrismicToolDataBodyImageHighlight {
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
