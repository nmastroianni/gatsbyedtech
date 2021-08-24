import * as React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import { HiLink } from "react-icons/hi"
// import { htmlSerializer } from "../utils/htmlSerializer"

export const SectionHeading = ({ slice }) => {
  const {
    primary: {
      section_heading_background_color,
      section_heading_link,
      section_heading_text,
    },
  } = slice
  return (
    <header
      className="group py-2 sm:py-3 lg:py-5 flex justify-center items-center shadow-md dark:bg-opacity-50 text-center"
      style={{ backgroundColor: `${section_heading_background_color}` }}
      id={section_heading_link.text}
    >
      <button
        className="text-green-900 dark:text-opacity-0 group-hover:text-opacity-100 focus:text-white focus:text-opacity-100 transition duration-300 ease-in-out group-hover:text-white inline"
        onClick={() => {}}
      >
        <HiLink className="h-4 w-4 md:h-8 md:w-8 mx-1" />
        <span className="sr-only">Copy heading link</span>
      </button>
      {section_heading_text.raw[0].type === "heading2" ? (
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-teko inline">
          {RichText.asText(section_heading_text.raw)}
        </h2>
      ) : (
        <h3>{RichText.asText(section_heading_text.raw)}</h3>
      )}
    </header>
  )
}
export const query = graphql`
  fragment HomepageDataBodySectionHeading on PrismicHomepageDataBodySectionHeading {
    primary {
      section_heading_background_color
      section_heading_link {
        text
      }
      section_heading_text {
        raw
      }
    }
  }
  fragment PageDataBodySectionHeading on PrismicPageDataBodySectionHeading {
    primary {
      section_heading_background_color
      section_heading_link {
        text
      }
      section_heading_text {
        raw
      }
    }
  }
  fragment PostDataBodySectionHeading on PrismicPostDataBodySectionHeading {
    primary {
      section_heading_background_color
      section_heading_link {
        text
      }
      section_heading_text {
        raw
      }
    }
  }
`
