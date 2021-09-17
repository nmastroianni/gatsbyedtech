import * as React from "react"
import { graphql } from "gatsby"
import { RichText } from "prismic-reactjs"
import { getSrcSet } from "gatsby-plugin-image"
import htmlSerializer from "../utils/htmlSerializer"

export const YouTubeHighlight = ({ slice }) => {
  const {
    primary: {
      youtube_description,
      youtube_embed: { embed_url, provider_name, thumbnail_url, title },
      youtube_position,
      youtube_thumbnail,
      youtube_title,
    },
  } = slice
  // Get the proper video data based on the video source
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
  // Conditionally return/render content based on videoPosition value
  if (videoPosition === "left") {
    return (
      <section className="">
        <div className="max-w-screen-2xl mx-auto grid md:grid-cols-2 p-4 gap-y-4 divide-y md:divide-y-0 md:gap-x-4">
          {/* BEGIN LEFT SIDE VIDEO EMBED */}
          <div className="bg-black p-3 rounded-md">
            <div className="bg-gradient-to-b from-black to-gray-900 aspect-w-16 aspect-h-9 rounded-md">
              {provider_name !== "video.other" && (
                <iframe
                  title={
                    youtube_title.raw
                      ? RichText.asText(youtube_title.raw)
                      : title
                  }
                  className="rounded-md"
                  src={video}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  loading="lazy"
                  allowFullScreen
                  srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style>
                        <a href=${video}>
                          <img
                            src=${
                              youtube_thumbnail.url
                                ? youtube_thumbnail.url
                                : thumbnail_url
                            }
                            srcset=${getSrcSet(
                              youtube_thumbnail.gatsbyImageData
                            )}
                            alt='Decortaive' />
                          <span>&#x25BA;</span>
                          
                        </a>`}
                ></iframe>
              )}
              {provider_name === "video.other" && (
                <iframe
                  src={video}
                  className="mx-auto rounded-md"
                  allow="autoplay"
                  title={RichText.asText(youtube_title.raw)}
                ></iframe>
              )}
            </div>
          </div>
          {/* END LEFTSIDE VIDEO EMBED */}
          {/* BEGIN RIGHT SIDE VIDEO DESCRIPTION */}
          <div className="w-full pt-4 mx-auto">
            <h2 className="text-center text-green-800 dark:text-green-200 font-teko text-3xl md:text-4xl">
              {youtube_title.raw ? RichText.asText(youtube_title.raw) : title}
            </h2>
            <div className="h-1 my-3 rounded bg-gradient-to-r from-transparent via-green-800 to-transparent dark:from-transparent dark:via-green-400 dark:to-transparent" />
            <div className="prose prose-green lg:prose-xl dark:prose-dark">
              <RichText
                render={youtube_description.raw}
                htmlSerializer={htmlSerializer}
              />
            </div>
          </div>
          {/* END RIGHT SIDE VIDEO DESCRIPTION */}
        </div>
      </section>
    )
  } else {
    return (
      <section className="">
        <div className="max-w-screen-2xl mx-auto grid md:grid-cols-2 p-4 gap-y-4 divide-y md:divide-y-0 md:gap-x-4">
          {/* BEGIN LEFT SIDE VIDEO DESCRIPTION */}
          <div className="w-full pt-4 mx-auto">
            <h2 className="text-center text-green-800 dark:text-green-200 font-teko text-3xl md:text-4xl">
              {youtube_title.raw ? RichText.asText(youtube_title.raw) : title}
            </h2>
            <div className="h-1 my-3 rounded bg-gradient-to-r from-transparent via-green-800 to-transparent dark:from-transparent dark:via-green-400 dark:to-transparent" />
            <div className="prose prose-green lg:prose-xl dark:prose-dark">
              <RichText
                render={youtube_description.raw}
                htmlSerializer={htmlSerializer}
              />
            </div>
          </div>
          {/* END LEFTSIDE VIDEO DESCRIPTION */}
          {/* BEGIN RIGHT SIDE VIDEO EMBED */}
          <div className="bg-black p-3 rounded-md">
            <div className="bg-gradient-to-b from-black to-gray-900 aspect-w-16 aspect-h-9 rounded-md">
              {provider_name !== "video.other" && (
                <iframe
                  title={
                    youtube_title.raw
                      ? RichText.asText(youtube_title.raw)
                      : title
                  }
                  className="rounded-md"
                  src={video}
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  loading="lazy"
                  allowFullScreen
                  srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style>
                        <a href=${video}>
                          <img
                            src=${youtube_thumbnail.url}
                            srcset=${getSrcSet(
                              youtube_thumbnail.gatsbyImageData
                            )}
                            alt='Decortaive' />
                          <span>&#x25BA;</span>
                          
                        </a>`}
                ></iframe>
              )}
              {provider_name === "video.other" && (
                <iframe
                  src={video}
                  className="mx-auto rounded-md"
                  allow="autoplay"
                  title={RichText.asText(youtube_title.raw)}
                ></iframe>
              )}
            </div>
          </div>

          {/* END RIGHT SIDE VIDEO EMBED */}
        </div>
      </section>
    )
  }
}

export const query = graphql`
  fragment HomepageDataBodyYoutubeHighlight on PrismicHomepageDataBodyYoutubeHighlight {
    id
    primary {
      youtube_description {
        raw
      }
      youtube_embed {
        embed_url
        provider_name
        thumbnail_url
        title
      }
      youtube_position
      youtube_thumbnail {
        gatsbyImageData(srcSetMinWidth: 320)
        url
      }
      youtube_title {
        raw
      }
    }
  }
  fragment PageDataBodyYoutubeHighlight on PrismicPageDataBodyYoutubeHighlight {
    id
    primary {
      youtube_description {
        raw
      }
      youtube_embed {
        embed_url
        provider_name
        thumbnail_url
        title
      }
      youtube_position
      youtube_thumbnail {
        gatsbyImageData(srcSetMinWidth: 320)
        url
      }
      youtube_title {
        raw
      }
    }
  }
  fragment PostDataBodyYoutubeHighlight on PrismicPostDataBodyYoutubeHighlight {
    id
    primary {
      youtube_description {
        raw
      }
      youtube_embed {
        embed_url
        provider_name
        thumbnail_url
        title
      }
      youtube_position
      youtube_thumbnail {
        gatsbyImageData(srcSetMinWidth: 320)
        url
      }
      youtube_title {
        raw
      }
    }
  }
  fragment ToolDataBodyYoutubeHighlight on PrismicToolDataBodyYoutubeHighlight {
    id
    primary {
      youtube_description {
        raw
      }
      youtube_embed {
        embed_url
        provider_name
        thumbnail_url
        title
      }
      youtube_position
      youtube_thumbnail {
        gatsbyImageData(srcSetMinWidth: 320)
        url
      }
      youtube_title {
        raw
      }
    }
  }
`
