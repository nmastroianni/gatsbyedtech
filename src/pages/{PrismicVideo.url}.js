import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SliceZone from "../components/SliceZone"
// import { RichText } from "prismic-reactjs"
// import htmlSerializer from "../utils/htmlSerializer"

export default function Video({ data, path }) {
  if (!data) return null
  const document = data.video.data
  const youTubeId = document.video_embed.embed_url.substring(
    document.video_embed.embed_url.length - 11
  )
  return (
    <Layout path={path}>
      <Seo title={document.video_title.text} />
      <div className="bg-black p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12 shadow-md">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              title={document.video_title.text}
              className="mx-auto rounded-md"
              src={`https://www.youtube.com/embed/${youTubeId}`}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              loading="lazy"
              allowFullScreen
              srcDoc={`<style>*{padding:0;margin:0;overflow:hidden}html,body{height:100%}img,span{position:absolute;width:100%;top:0;bottom:0;margin:auto}span{height:1.5em;text-align:center;font:48px/1.5 sans-serif;color:white;text-shadow:0 0 0.5em black}</style>
                            <a href=https://www.youtube.com/embed/${youTubeId}?autoplay=1>
                              <img
                                src=${document.video_embed.thumbnail_url}
                                alt='${document.video_title.text}'
                                />
            
                              <span>&#x25BA;</span>
                            </a>`}
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
// body {
//           ...VideoDataBodySectionHeading
//           ...VideoDataBodyText
//           ...VideoDataBodyFullWidthImage
//           ...VideoDataBodyImageHighlight
//         }
