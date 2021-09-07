import * as React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { RichText } from "prismic-reactjs"
import htmlSerializer from "../utils/htmlSerializer"
import Seo from "../components/Seo"
import Layout from "../components/Layout"
import { Pagination } from "../components/Pagination"

const BlogCard = ({ authors, excerpt, image, title, date, url }) => {
  return (
    <article className="rounded-md shadow-md">
      <header className="relative">
        <div className="font-teko text-xl md:text-3xl lg:text-4xl bg-green-200 bg-opacity-25 transition duration-300 ease-in-out hover:bg-opacity-0 absolute inset-0 flex items-center justify-center">
          <h2 className="text-center inline-block p-4 bg-green-900 text-white rounded-md leading-none grayscale-0">
            {title.text}
          </h2>
        </div>
        <GatsbyImage
          className="inset-0 z-0 h-60 rounded-t-md filter grayscale"
          image={getImage(image.gatsbyImageData)}
          alt="decorative image "
        />
      </header>

      <section className="dark:bg-gray-800 dark:text-white p-4">
        <div className="flex justify-center flex-wrap">
          <h3 className="font-teko text-xl dark:text-green-200 ">
            Published on {date} by{" "}
          </h3>
          <ul className="list-none font-teko text-xl dark:text-green-200 ml-1">
            {authors.map((author, i) => {
              return (
                <li
                  key={author.post_authors_author.document.id}
                  className="inline"
                >
                  {" "}
                  {author.post_authors_author.document.data.author_title.text}
                  {`${
                    authors.length > 1 && i < authors.length - 1 ? ` & ` : ``
                  }`}
                </li>
              )
            })}
          </ul>
        </div>

        <div className="prose prose-lg dark:prose-dark mx-auto">
          <RichText render={excerpt.raw} htmlSerializer={htmlSerializer} />
        </div>
      </section>
      <footer className=" dark:bg-gray-800 dark:text-white py-8 rounded-b-md text-center">
        <Link
          to={url}
          className=" px-4 py-3 border-2 border-green-800 dark:border-green-400 rounded-md hover:shadow-md hover:bg-green-200 hover:bg-opacity-20 dark:hover:bg-black dark:hover:bg-opacity-70 focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          Read This Article
        </Link>
      </footer>
    </article>
  )
}

export default function Blog({
  path,
  pageContext: { currentPage, limit, numPages, totalPosts },
  data: {
    allPrismicPost: { nodes },
  },
}) {
  return (
    <Layout path={path}>
      <Seo title="Blog" locale="en-US" />
      <div className="mx-auto mb-12 px-3">
        <header className="bg-gray-50 dark:bg-gray-800 mb-2 sm:mb-4 lg:mb-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-6xl py-3 md:py-4 lg:py-6 text-green-800 dark:text-green-100 font-teko">
            EdTech Blog
          </h1>
          {numPages > 1 ? (
            <h2 className="pb-3 md:pb-4 lg:pb-6 text-xl md:text-2xl lg:text-3xl text-green-700 dark:text-green-100 font-teko">
              Page {currentPage} of {numPages}
            </h2>
          ) : (
            <></>
          )}
        </header>
        {numPages > 1 ? (
          <div className="my-6">
            <Pagination
              currentPage={currentPage}
              pageCount={numPages}
              basePath="/blog"
            />
          </div>
        ) : (
          <></>
        )}
        <ul className="list-none max-w-screen-md mx-auto">
          {nodes.map(post => {
            const {
              data: {
                post_authors,
                post_excerpt,
                post_featured_image,
                post_title,
              },
              first_publication_date,
              prismicId,
              url,
            } = post
            return (
              <li key={prismicId}>
                <BlogCard
                  title={post_title}
                  authors={post_authors}
                  excerpt={post_excerpt}
                  image={post_featured_image}
                  date={first_publication_date}
                  url={url}
                />
              </li>
            )
          })}
        </ul>
      </div>
      {numPages > 1 ? (
        <div className="my-6">
          <Pagination
            currentPage={currentPage}
            pageCount={numPages}
            basePath="/blog"
          />
        </div>
      ) : (
        <></>
      )}
    </Layout>
  )
}

export const data = graphql`
  query ($skip: Int!, $limit: Int!) {
    allPrismicPost(
      sort: { fields: first_publication_date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      pageInfo {
        currentPage
        pageCount
      }
      nodes {
        url
        prismicId
        first_publication_date(formatString: "MMMM Do, YYYY")
        data {
          post_title {
            text
          }
          post_featured_image {
            gatsbyImageData(placeholder: BLURRED)
            alt
          }
          post_excerpt {
            raw
          }
          post_authors {
            post_authors_author {
              document {
                ... on PrismicAuthor {
                  id
                  data {
                    author_profile_image {
                      gatsbyImageData(placeholder: BLURRED)
                    }
                    author_title {
                      text
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
