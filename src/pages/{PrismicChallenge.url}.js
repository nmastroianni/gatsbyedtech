import * as React from "react"
import { graphql, Link, navigate } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import SliceZone from "../components/SliceZone"

export default function PrismicChallenge({ data, path }) {
  const {
    site: {
      siteMetadata: { siteImage, siteUrl },
    },
    prismicChallenge: {
      challengeUrl,
      last_publication_date,
      data: { body, challenge_featured_image, related_tools, title },
    },
  } = data
  const canonical = `${siteUrl}${challengeUrl}`
  return (
    <Layout path={path}>
      <Seo
        url={canonical}
        title={title.text}
        description={
          challenge_featured_image.alt
            ? challenge_featured_image.alt
            : "Check out another EdTech challenge. Will you complete this challenge?"
        }
        image={
          challenge_featured_image.gatsbyImageData
            ? `${getImage(challenge_featured_image).images.fallback.src}`
            : `${siteUrl}${siteImage}`
        }
      />
      <article className="bg-gray-100 dark:bg-gray-900">
        <div className=" max-w-screen-2xl mx-auto">
          <GatsbyImage
            image={getImage(challenge_featured_image)}
            alt={`${challenge_featured_image.alt || ``}`}
            className="w-full"
          />
        </div>
        <div className="w-full">
          <h2 className="font-teko text-center text-4xl md:text-6xl lg:text-7xl bg-emerald-900 text-white pt-3 pb-1.5">
            {title.text}
          </h2>
        </div>
        <div className="shadow-sm py-3 md:py-4 lg:py-6 ">
          <h3 className="font-teko text-emerald-900 dark:text-emerald-200 py-3 text-center text-2xl md:text-4xl lg:text-5xl">
            {related_tools.length === 1
              ? `Tool You Will Need`
              : `Tools You Will Need`}
          </h3>
          <ul
            className={`grid md:grid-cols-${related_tools.length} place-items-center`}
          >
            {related_tools.map(tool => {
              const {
                tool: {
                  toolUrl,
                  document: {
                    data: { tool_title, tool_logo },
                    prismicId,
                  },
                },
              } = tool
              return (
                <li key={prismicId} className="text-center">
                  <GatsbyImage
                    image={getImage(tool_logo)}
                    alt={tool_title.text}
                    onClick={() => navigate(toolUrl)}
                    className="cursor-pointer"
                  />

                  <Link to={toolUrl} className="sr-only">
                    <span className="text-xs block">
                      Learn more about {tool_title.text}
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="mx-auto">
          <h3 className="text-center py-3 md:py-4 lg:py-6 font-teko text-emerald-900 dark:text-emerald-200 text-lg md:text-xl lg:text-2xl">
            Last Updated on {last_publication_date}
          </h3>
        </div>
        <div>
          <SliceZone sliceZone={body} />
        </div>
      </article>
    </Layout>
  )
}

export const query = graphql`
  query ChallengeQuery($id: String!) {
    prismicChallenge(id: { eq: $id }) {
      challengeUrl: url
      last_publication_date(formatString: "MMMM Do, YYYY")
      data {
        title {
          text
        }
        challenge_featured_image {
          gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
          alt
        }
        body {
          ... on PrismicSliceType {
            slice_type
          }
          ...ChallengeDataBodySectionHeading
          ...ChallengeDataBodyText
          ...ChallengeDataBodyImageHighlight
          ...ChallengeDataBodyFullWidthImage
          ...ChallengeDataBodyYoutubeHighlight
        }
        related_tools {
          tool {
            toolUrl: url
            document {
              ... on PrismicTool {
                id

                prismicId
                data {
                  tool_logo {
                    gatsbyImageData(width: 128)
                  }
                  tool_title {
                    text
                  }
                }
              }
            }
          }
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
        siteImage
      }
    }
  }
`
