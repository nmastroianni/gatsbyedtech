import * as React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/Layout"
import Seo from "../../components/Seo"
import { HiArrowDown } from "react-icons/hi"

const PrismicTag = ({ data, path }) => {
  console.log(data)
  const {
    allPrismicPost: { nodes },
    prismicTag: {
      data: {
        title: { text },
      },
      url,
    },
    site: {
      siteMetadata: { siteUrl },
    },
  } = data
  if (!data) return null

  return (
    <Layout path={path}>
      <Seo
        title={`Tag - ${text}`}
        description={`Check out our posts related to ${text}.`}
        url={`${siteUrl}${url}`}
      />
      <div className="max-w-screen-sm mx-auto">
        <header className="">
          <h1 className="font-teko dark:text-emerald-200 text-4xl md:text-5xl lg:text-7xl text-center text-emerald-900 mt-3 md:mt-4 lg:mt-6">
            {text}
          </h1>
          <p className="text-center dark:text-white">
            Listed below are all of our posts that are related to {text}
          </p>
          <HiArrowDown className=" animate-bounce w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 my-3 md:my-4 lg:my-6 mx-auto text-emerald-800" />
        </header>
        <ol className="flex flex-col gap-y-4 font-source dark:text-white p-2 md:p-3 text-xl md:text-2xl mx-auto max-w-md md:max-w-xl lg:max-w-2xl">
          {nodes.map(post => {
            return (
              <li
                className="h-20 py-5 pl-3 border-2 hover:bg-emerald-50 hover:shadow-sm hover:shadow-emerald-200 dark:hover:bg-emerald-900 rounded-full relative"
                key={post.id}
              >
                <Link
                  to={post.url}
                  className="absolute inset-0 text-center py-5"
                >
                  {post.data.post_title.text}
                </Link>
              </li>
            )
          })}
        </ol>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query TagPostQuery($uid: String) {
    prismicTag(uid: { eq: $uid }) {
      uid
      id
      url
      data {
        title {
          text
        }
      }
    }
    allPrismicPost(
      filter: { data: { tags: { elemMatch: { tag: { uid: { eq: $uid } } } } } }
      sort: { fields: first_publication_date, order: DESC }
    ) {
      nodes {
        id
        data {
          post_title {
            text
          }
        }
        url
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`
export default PrismicTag
