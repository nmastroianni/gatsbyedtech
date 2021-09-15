import * as React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import htmlSerializer from "../utils/htmlSerializer"

export const YouTubeHighlight = ({ slice }) => {
  const {
    primary: {
      youtube_embed: { embed_url, provider_name, thumbnail_url, title },
      youtube_position,
      youtube_thumbnail: { alt, gatsbyImageData },
      youtube_title: { raw },
    },
  } = slice
  let video
  let videoPosition
  if (provider_name === "YouTube") {
    let id = embed_url.substring(embed_url.length - 11)
    video = `https://www.${provider_name}.com/embed/${id}`
  } else if (provider_name === "Loom") {
    let id = embed_url.substring(embed_url.length - 32)
    video = `https://www.${provider_name}.com/embed/${id}`
  } else if (provider_name === "video.other") {
    video = embed_url
  }
  youtube_position ? (videoPosition = "right") : (videoPosition = "left")
  if (videoPosition === "left") {
    return (
      <div className="max-w-screen-2xl mx-auto bg-purple-200">
        <RichText render={raw} htmlSerializer={htmlSerializer} />
      </div>
    )
  }
}

export const query = graphql`
  fragment HomepageDataBodyYoutubeHighlight on PrismicHomepageDataBodyYoutubeHighlight {
    id
    primary {
      youtube_embed {
        embed_url
        provider_name
        thumbnail_url
        title
      }
      youtube_position
      youtube_thumbnail {
        alt
        gatsbyImageData(placeholder: BLURRED)
      }
      youtube_title {
        raw
      }
    }
  }
`
