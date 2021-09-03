import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SliceZone from "../components/SliceZone"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { linkResolver } from "../utils/linkResolver"
// import { RichText } from "prismic-reactjs"
// import htmlSerializer from "../utils/htmlSerializer"

const PrismicVideo = ({ data, path }) => {
  if (!data) return null
  const document = data.video.data
  const getVideoSrc = url => {
    let id = ""
    if (document.video_embed.provider_name === "YouTube") {
      id = url.substring(url.length - 11)
      return `https://www.${document.video_embed.provider_name}.com/embed/${id}`
    } else if (document.video_embed.provider_name === "Loom") {
      id = url.substring(url.length - 32)
      return `https://www.${document.video_embed.provider_name}.com/embed/${id}`
    } else if (document.video_embed.provider_name === "video.other") {
      return document.video_embed.embed_url
    }
  }
  const videoSrc = getVideoSrc(document.video_embed.embed_url)
  return (
    <Layout path={path}>
      <Seo title={document.video_title.text} />
      <div className="bg-black p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 shadow-md">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              title={document.video_title.text}
              className="mx-auto rounded-md"
              src={videoSrc}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              loading="lazy"
              allowFullScreen
              // srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style>
              //               <a href=${videoSrc}>
              //                 <img
              //                   src=${document.video_embed.thumbnail_url}?autoplay=1
              //                   alt='${document.video_title.text}'
              //                   />

              //                 <span>&#x25BA;</span>
              //               </a>`}
            ></iframe>
          </div>
        </div>
      </div>
      <SliceZone sliceZone={document.body} />
    </Layout>
  )
}

export const query = graphql`
  query VideoQuery($id: String) {
    video: prismicVideo(id: { eq: $id }) {
      data {
        video_description {
          raw
        }
        video_embed {
          embed_url
          provider_name
          thumbnail_url
        }
        video_title {
          text
        }
        body {
          ... on PrismicSliceType {
            slice_type
          }
          ...VideoDataBodyText
        }
      }
    }
  }
`
export default withPrismicPreview(PrismicVideo, [
  {
    repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
    linkResolver,
  },
])
