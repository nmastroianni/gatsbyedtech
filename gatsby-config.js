/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const path = require("path")
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
module.exports = {
  /* Your site config here */
  siteMetadata: {
    siteUrl: `https://longbranch.k12.nj.us`,
    title: "LBPS EdTech",
    description:
      "The Educational Technology Department at Long Branch Public Schools is dedicated to help staff make the most of the digital tools at their disposal so that all stakeholders may thrive.",
    authors: [
      {
        name: "Lois Alston",
        twitterUsername: "@l_alston",
        profileImage: "/favicon.ico",
      },
      {
        name: "Neil Mastroianni",
        twitterUsername: "@nmastroianni",
        profileImage: "/favicon.ico",
      },
    ],
    siteImage: "/favicon.ico",
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    //`gatsby-plugin-sitemap`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: path.join(__dirname, `src`, `pages`),
      },
      __key: `pages`,
    },
    {
      resolve: `gatsby-source-prismic`,
      options: {
        repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        customTypesApiToken: process.env.PRISMIC_CUSTOM_TYPES_API_TOKEN,
        linkResolver: require("./src/utils/linkResolver").linkResolver,
      },
    },
  ],
}
