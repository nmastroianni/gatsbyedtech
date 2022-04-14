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
    siteUrl: `https://www.edtechwave.com`,
    title: "LBPS EdTech",
    description:
      "The EdTechWave at Long Branch Public Schools is dedicated to helping educators master technology.",
    siteImage: "/defaultSiteImage.png",
  },
  plugins: [
    `gatsby-plugin-postcss`,
    `gatsby-plugin-image`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://www.edtechwave.com/`,
        sitemap: `https://www.edtechwave.com/sitemap/sitemap-index.xml`,
        policy: [
          {
            userAgent: "*",
            allow: "/",
          },
        ],
      },
    },
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
        customTypesApiToken: process.env.PRISMIC_CUSTOM_TYPES_API_TOKEN,
        linkResolver: require("./src/utils/linkResolver").linkResolver,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `EdTech Wave`,
        short_name: `LBPSedTech`,
        start_url: `/`,
        background_color: `#064E3B`,
        theme_color: `#D1FAE5`,
        display: `standalone`,
        icon: `src/images/favicon-icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `edtechwave`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        excludes: [],
      },
    },
  ],
}
