import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SliceZone from "../components/SliceZone"
import { RichText } from "prismic-reactjs"
import htmlSerializer from "../utils/htmlSerializer"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { linkResolver } from "../utils/linkResolver"

const AuthorCard = ({ description, image, name }) => {
  return (
    <article className="max-w-screen-sm p-4 mx-auto border-2 dark:border-gray-700 flex space-x-3">
      <GatsbyImage
        image={getImage(image.gatsbyImageData)}
        alt={`${image.alt || `profile picture of ${name}`}`}
        className="rounded-full w-24 h-24"
      />
      <div className="flex-1">
        <h1 className="font-teko dark:text-green-200 text-xl md:text-2xl lg:text-3xl">
          {name}
        </h1>
        <div className="prose dark:prose-dark">
          <RichText render={description.raw} htmlSerializer={htmlSerializer} />
        </div>
      </div>
    </article>
  )
}

const PrismicPost = ({ data, path }) => {
  if (!data) return null
  const document = data.post
  console.log(document)
  const {
    data: { body, post_authors, post_featured_image, post_title },
    first_publication_date,
    tags,
  } = document
  return (
    <Layout path={path}>
      <Seo title={post_title.text} />
      <section className="relative max-w-screen-2xl mx-auto">
        <div className="">
          <GatsbyImage
            image={getImage(post_featured_image.gatsbyImageData)}
            alt={`${post_featured_image.alt || `deocrative image`} `}
            className="w-full"
          />
        </div>
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 rounded-t-md w-11/12">
          <h2 className="font-teko text-center text-3xl md:text-4xl lg:text-5xl bg-green-900 text-white p-3 rounded-t-md">
            {post_title.text}
          </h2>
        </div>
      </section>
      <div className=" max-w-screen-2xl mx-auto">
        <h3 className=" bg-gradient-to-b from-green-900 to-gray-900 py-3 md:py-4 lg:py-6 font-teko text-center text-white text-lg md:text-xl lg:text-2xl">
          Published on {first_publication_date}
        </h3>
      </div>
      <div>
        <SliceZone sliceZone={body} />
      </div>
      <section id="author-info">
        <ul>
          {post_authors.map((author, i) => {
            const {
              post_authors_author: {
                document: {
                  id,
                  data: {
                    author_description,
                    author_profile_image,
                    author_socials,
                    author_title,
                  },
                },
              },
            } = author
            return (
              <li key={id} className="my-3">
                <AuthorCard
                  name={author_title.text}
                  image={author_profile_image}
                  description={author_description}
                />
              </li>
            )
          })}
        </ul>
      </section>
    </Layout>
  )
}

export const query = graphql`
  query PostQuery($id: String) {
    post: prismicPost(id: { eq: $id }) {
      _previewable
      first_publication_date(formatString: "MMMM Do, YYYY")
      tags
      data {
        post_title {
          text
        }
        post_featured_image {
          alt
          gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED)
        }
        post_authors {
          post_authors_author {
            document {
              ... on PrismicAuthor {
                id
                data {
                  author_description {
                    raw
                  }
                  author_profile_image {
                    alt
                    gatsbyImageData(placeholder: BLURRED)
                  }
                  author_socials {
                    author_socials_platform
                    author_socials_link {
                      url
                    }
                  }
                  author_title {
                    text
                  }
                }
              }
            }
          }
        }
        body {
          ... on PrismicSliceType {
            slice_type
          }
          ...PostDataBodySectionHeading
          ...PostDataBodyText
          ...PostDataBodyFullWidthImage
          ...PostDataBodyImageHighlight
        }
      }
    }
  }
`
export default withPrismicPreview(PrismicPost, [
  {
    repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
    linkResolver,
  },
])
