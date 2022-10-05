import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Disqus } from "gatsby-plugin-disqus"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SliceZone from "../components/SliceZone"
import { RichText } from "prismic-reactjs"
import htmlSerializer from "../utils/htmlSerializer"
import {
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa"
import { HiTag } from "react-icons/hi"

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
        <h1 className=" text-emerald-800 dark:text-emerald-200 text-xl md:text-2xl lg:text-3xl">
          {name}
        </h1>
        <div className="prose dark:prose-dark">
          <RichText
            render={description.richText}
            htmlSerializer={htmlSerializer}
          />
        </div>
        {socials.length ? (
          <div className="flex items-center my-3 md:my-4 lg:my-6">
            <h2 className=" text-base md:text-lg lg:text-xl text-emerald-800 dark:text-emerald-200 mr-3 md:mr-4">
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
                  <li
                    className="text-emerald-800 dark:text-emerald-200"
                    key={url}
                  >
                    <a href={url}>
                      <SocialIcon className="inline w-6 h-6 hover:text-emerald-900 dark:hover:text-emerald-100" />
                      <span className="sr-only">
                        {`Connect with ${name} on ${author_socials_platform}`}
                      </span>
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
  if (!data) return null
  const document = data.prismicPost
  const {
    data: {
      body,
      post_authors,
      post_featured_image,
      post_title,
      post_excerpt,
      tags,
    },
    first_publication_date,
    uid,
    url,
  } = document
  /**
   * 10/13/2021 - Noticed unpublished previews won't bring in the site { siteMetadata: {...}} query data
   * Providing hard coded values if isPreview === true
   */
  let disqusConfig = {
    url: `${
      !data.isPreview
        ? data.site.siteMetadata.siteUrl
        : `https://edtechwave.com`
    }${path}/`,
    identifier: uid,
    title: post_title.text,
  }
  const canonical = `${data.site.siteMetadata.siteUrl}${url}`
  return (
    <Layout path={path}>
      <Seo
        url={canonical}
        title={post_title.text}
        description={post_excerpt.text ? post_excerpt.text : ""}
        image={
          post_featured_image.gatsbyImageData
            ? `${
                getImage(post_featured_image.gatsbyImageData).images.fallback
                  .src
              }`
            : `${
                !data.isPreview
                  ? data.site.siteMetadata.siteUrl
                  : `https://edtechwave.com`
              }${
                !data.isPreview
                  ? data.site.siteMetadata.siteImage
                  : `defaultSiteImage.png`
              }`
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
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0  w-full">
          <h2 className=" text-center text-4xl md:text-5xl lg:text-6xl bg-emerald-900 text-white py-4">
            {post_title.text}
          </h2>
        </div>
      </section>
      <div className="mx-auto">
        <h3 className="py-3 md:py-4 lg:py-6  text-center dark:text-white text-lg md:text-xl lg:text-2xl">
          Published on {first_publication_date}
        </h3>
        {tags.length ? (
          <ul className="flex text-emerald-800 dark:text-emerald-200 justify-center gap-1 md:gap-2 lg:gap-4">
            {tags.map(tag => {
              const {
                tag: {
                  url,
                  document: {
                    id,
                    data: {
                      title: { text },
                    },
                  },
                },
              } = tag
              return (
                <li key={id}>
                  <Link to={url} className="hover:underline">
                    <HiTag className="w-5 h-5 inline" />
                    {text}
                  </Link>
                </li>
              )
            })}
          </ul>
        ) : null}
      </div>
      <div>
        <SliceZone sliceZone={body} />
      </div>
      <section id="author-info">
        <h2 className="relative text-center  text-emerald-800 dark:text-emerald-200 text-2xl md:text-3xl lg:text-4xl mt-3 md:mt-4 lg:mt-6">
          Meet the {`${post_authors.length > 1 ? `Authors` : `Author`}`} ...
          <span className="absolute h-8 w-3 border-emerald-800 dark:border-emerald-400 animate-pulse border-r-4"></span>
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
      <div className="max-w-screen-md mx-auto px-3">
        <h2 className=" text-emerald-800 text-3xl md:text-4xl lg:text-6xl dark:text-emerald-200 text-center">
          Have Thoughts or Questions?
        </h2>
        <p className=" text-xl md:text-2xl lg:text-3xl text-center mb-2 md:mb-3 lg:mb-6 dark:text-white">
          Leave Us a Comment
        </p>
        <Disqus config={disqusConfig} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query PostQuery($id: String) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    prismicPost(id: { eq: $id }) {
      first_publication_date(formatString: "MMMM Do, YYYY")
      tags
      uid
      url
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
        tags {
          tag {
            url
            document {
              ... on PrismicTag {
                id
                data {
                  title {
                    text
                  }
                }
              }
            }
          }
        }
        post_authors {
          post_authors_author {
            document {
              ... on PrismicAuthor {
                id
                data {
                  author_description {
                    richText
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
  }
`
export default PrismicPost
