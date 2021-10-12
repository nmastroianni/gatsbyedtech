const path = require("path")
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const result = await graphql(
    `
      {
        allPrismicPost(sort: { fields: first_publication_date, order: DESC }) {
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
  )
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  // Create blog-list pages
  const posts = result.data.allPrismicPost.nodes
  const postsPerPage = 10
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog/` : `/blog/${i + 1}/`,
      component: path.resolve("./src/templates/blog-index.js"),
      context: {
        totalPosts: posts.length,
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
  // BEGIN VIDEO PAGES
  const videosResult = await graphql(
    `
      {
        allPrismicVideo(sort: { fields: first_publication_date, order: DESC }) {
          nodes {
            url
            prismicId
            first_publication_date(formatString: "MMMM Do, YYYY")
            data {
              video_title {
                text
              }
              video_description {
                raw
              }
              video_embed {
                thumbnail_url
                provider_name
                embed_url
              }
            }
          }
        }
      }
    `
  )
  if (videosResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  // Create videos-list pages
  const videos = videosResult.data.allPrismicVideo.nodes
  const videosPerPage = 6
  const numVideoPages = Math.ceil(videos.length / videosPerPage)
  Array.from({ length: numVideoPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/videos/` : `/videos/${i + 1}/`,
      component: path.resolve("./src/templates/video-index.js"),
      context: {
        totalVideos: videos.length,
        limit: videosPerPage,
        skip: i * videosPerPage,
        numVideoPages,
        currentPage: i + 1,
        basePath: "/videos",
      },
    })
  })
  // BEGIN TOOLS PAGES
  const toolsResult = await graphql(
    `
      {
        allPrismicTool(sort: { fields: data___tool_title___text, order: ASC }) {
          pageInfo {
            currentPage
            pageCount
          }
          nodes {
            url
            data {
              tool_description {
                raw
              }
              tool_logo {
                gatsbyImageData(placeholder: BLURRED)
              }
              tool_title {
                text
              }
            }
          }
        }
      }
    `
  )
  if (toolsResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  // Create tools-list pages
  const tools = toolsResult.data.allPrismicTool.nodes
  const toolsPerPage = 6
  const numToolPages = Math.ceil(tools.length / toolsPerPage)
  Array.from({ length: numToolPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/tools/` : `/tools/${i + 1}/`,
      component: path.resolve("./src/templates/tools-index.js"),
      context: {
        totalPosts: tools.length,
        limit: toolsPerPage,
        skip: i * toolsPerPage,
        numPages: numToolPages,
        currentPage: i + 1,
        basePath: "/tools",
      },
    })
  })
}
