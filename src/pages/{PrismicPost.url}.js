import * as React from "react"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SliceZone from "../components/SliceZone"
import { RichText } from "prismic-reactjs"
import htmlSerializer from "../utils/htmlSerializer"
import {
  withPrismicPreview,
  useMergePrismicPreviewData,
} from "gatsby-plugin-prismic-previews"
import { linkResolver } from "../utils/linkResolver"
import {
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa"

const AuthorCard = ({ description, image, name, socials }) => {
  return (
    <article className="max-w-screen-sm p-4 mx-auto rounded-sm shadow-sm border dark:border-gray-700 flex space-x-3 items-center">
      <GatsbyImage
        image={getImage(image.gatsbyImageData)}
        alt={`${image.alt || `profile picture of ${name}`}`}
        className="w-24 rounded-full"
        imgClassName="rounded-full"
      />
      <div className="flex-1">
        <h1 className="font-teko text-green-800 dark:text-green-200 text-xl md:text-2xl lg:text-3xl">
          {name}
        </h1>
        <div className="prose dark:prose-dark">
          <RichText render={description.raw} htmlSerializer={htmlSerializer} />
        </div>
        {socials.length ? (
          <div className="flex items-center my-3 md:my-4 lg:my-6">
            <h2 className="font-teko text-base md:text-lg lg:text-xl text-green-800 dark:text-green-200 mr-3 md:mr-4">
              Connect with me:
            </h2>
            <ul className={`list-none flex space-x-4`}>
              {socials.map(social => {
                const icons = {
                  Twitter: FaTwitter,
                  LinkedIn: FaLinkedin,
                  Instagram: FaInstagram,
                  YouTube: FaYoutube,
                  Facebook: FaFacebook,
                }
                const {
                  author_socials_link: { url },
                  author_socials_platform,
                } = social
                const SocialIcon = icons[author_socials_platform]
                return (
                  <li className="text-green-800 dark:text-green-200" key={url}>
                    <a href={url}>
                      <SocialIcon className="inline w-6 h-6 hover:text-green-900 dark:hover:text-green-100" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
    </article>
  )
}

const PrismicPost = ({ data, path }) => {
  const queryData = useMergePrismicPreviewData(data)
  if (!data) return null
  const document = queryData.data.prismicPost
  const {
    data: { body, post_authors, post_featured_image, post_title, post_excerpt },
    first_publication_date,
    //tags,
  } = document
  return (
    <Layout path={path}>
      <Seo
        path={path}
        title={post_title.text}
        description={post_excerpt.text ? post_excerpt.text : ""}
        image={
          post_featured_image.gatsbyImageData
            ? `${
                getImage(post_featured_image.gatsbyImageData).images.fallback
                  .src
              }`
            : `${data.site.siteMetadata.siteUrl}${data.site.siteMetadata.siteImage}`
        }
      />
      <section className="relative bg-gray-200 dark:bg-gray-900">
        <div className=" max-w-screen-2xl mx-auto">
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
      <div className=" mx-auto">
        <h3 className=" bg-gradient-to-b from-gray-200 dark:from-green-900 to-transparent py-3 md:py-4 lg:py-6 font-teko text-center dark:text-white text-lg md:text-xl lg:text-2xl">
          Published on {first_publication_date}
        </h3>
      </div>
      <div>
        <SliceZone sliceZone={body} />
      </div>
      <section id="author-info">
        <h2 className="relative text-center font-teko text-green-800 dark:text-green-200 text-2xl md:text-3xl lg:text-4xl mt-3 md:mt-4 lg:mt-6">
          Meet the {`${post_authors.length > 1 ? `Authors` : `Author`}`} ...
          <span className="absolute h-8 w-3 border-green-800 dark:border-green-400 animate-pulse border-r-4"></span>
        </h2>
        <ul className="mb-3 md:mb-4 lg:mb-6">
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
                  socials={author_socials}
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
    prismicPost(id: { eq: $id }) {
      _previewable
      first_publication_date(formatString: "MMMM Do, YYYY")
      tags
      data {
        post_title {
          text
        }
        post_excerpt {
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
          ...PostDataBodyYoutubeHighlight
          ...PostDataBodyContentGrid
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
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
