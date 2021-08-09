/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

const path = require("path")
console.log(process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY)
module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: "Your Site Title Goes Here",
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
      resolve: `gatsby-source-google-spreadsheet`,
      options: {
        spreadsheetId: `1JZLh6a9in7fQdgwbZ8fN6M-f2d-AUVdbANEvFjZJqVo`,
        typePrefix: `GoogleSheet`,
        credentials: require("./edtechsite-66cc421d94c8.json"),
        filterNode: () => true,
        mapNode: node => node,
      },
    },
  ],
}
