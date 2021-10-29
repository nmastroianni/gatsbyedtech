import * as React from "react"
import { useState } from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import { HiLink } from "react-icons/hi"

export const SectionHeading = ({ slice }) => {
  const {
    primary: {
      section_heading_background_color,
      section_heading_link,
      section_heading_text,
    },
  } = slice
  const [isCopied, setIsCopied] = useState(false)
  const url = typeof window !== "undefined" ? window.location.href : ""
  return (
    <div
      className="relative mx-auto group py-2 sm:py-3 lg:py-5 px-2 sm:px-3 flex justify-center items-center shadow-md dark:bg-opacity-50 text-center"
      style={{ backgroundColor: `${section_heading_background_color}` }}
      id={section_heading_link.text}
    >
      <div className="relative">
        {isCopied ? (
          <p
            className={` z-10 w-24 text-white absolute -top-6 -left-6 
          }`}
          >
            Link Copied!
          </p>
        ) : (
          ""
        )}
        <button
          className="relative text-green-900 text-opacity-0 dark:text-opacity-0 group-hover:text-opacity-100 focus:text-white focus:text-opacity-100 transition duration-300 ease-in-out group-hover:text-white inline"
          onClick={() => {
            setIsCopied(true)
            navigator.clipboard.writeText(`${url}#${section_heading_link.text}`)
            setTimeout(() => {
              setIsCopied(false)
            }, 1000)
          }}
        >
          <HiLink className="h-4 w-4 md:h-8 md:w-8 mx-1" />
          <span className="sr-only">Copy heading link</span>
        </button>
      </div>
      <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-teko inline">
        {RichText.asText(section_heading_text.richText)}
      </h2>
    </div>
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
        richText
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
        richText
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
        richText
      }
    }
  }
  fragment ToolDataBodySectionHeading on PrismicToolDataBodySectionHeading {
    primary {
      section_heading_background_color
      section_heading_link {
        text
      }
      section_heading_text {
        richText
      }
    }
  }
`
