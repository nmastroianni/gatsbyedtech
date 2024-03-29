const path = require("path")
const redirects = require("./redirects.json")
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions

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
                richText
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
        basePath: "/blog",
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
                richText
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
                richText
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
  const toolsPerPage = 12
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
  // BEGIN CHALLENGES PAGES

  const challengesResult = await graphql(
    `
      {
        allPrismicChallenge(
          sort: { fields: first_publication_date, order: DESC }
        ) {
          nodes {
            url
            prismicId
            last_publication_date(formatString: "MMMM, Do YYYY")
            data {
              title {
                text
              }
              challenge_featured_image {
                gatsbyImageData
                alt
              }
            }
          }
        }
      }
    `
  )
  if (challengesResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  // Create challenges-list pages
  const challenges = challengesResult.data.allPrismicChallenge.nodes
  const challengesPerPage = 12
  const numChallengePages = Math.ceil(challenges.length / challengesPerPage)
  Array.from({ length: numChallengePages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/challenges/` : `/challenges/${i + 1}/`,
      component: path.resolve("./src/templates/challenges-index.js"),
      context: {
        totalPosts: challenges.length,
        limit: challengesPerPage,
        skip: i * challengesPerPage,
        numPages: numChallengePages,
        currentPage: i + 1,
        basePath: "/challenges",
      },
    })
  })
  redirects.forEach(redirect => {
    createRedirect({
      fromPath: redirect.fromPath,
      toPath: redirect.toPath,
    })
  })
}
