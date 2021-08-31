import * as React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import htmlSerializer from "../utils/htmlSerializer"

export const Text = ({ slice }) => {
  const {
    primary: {
      text_prose,
      content: { raw },
    },
  } = slice

  return (
    <div
      className={`${
        text_prose
          ? `prose prose-lg md:prose-xl prose-green md:prose-xl`
          : `px-3 text-base md:text-lg max-w-7xl`
      } dark:prose-dark mx-auto p-3 md:p-4 lg:p-6 my-2 sm:my-3 md:my-4 lg:my-6 `}
    >
      <RichText render={raw} htmlSerializer={htmlSerializer} />
    </div>
  )
}
export const query = graphql`
  fragment HomepageDataBodyText on PrismicHomepageDataBodyText {
    id
    primary {
      text_prose
      content {
        raw
      }
    }
  }

  fragment PageDataBodyText on PrismicPageDataBodyText {
    id
    primary {
      text_prose
      content {
        raw
      }
    }
  }

  fragment PostDataBodyText on PrismicPostDataBodyText {
    id
    primary {
      text_prose
      content {
        raw
      }
    }
  }
  fragment ToolDataBodyText on PrismicToolDataBodyText {
    id
    primary {
      text_prose
      content {
        raw
      }
    }
  }
  fragment VideoDataBodyText on PrismicVideoDataBodyText {
    id
    primary {
      text_prose
      content {
        raw
      }
    }
  }
`
