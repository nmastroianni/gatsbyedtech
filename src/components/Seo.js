import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Helmet } from "react-helmet"

const query = graphql`
  {
    site {
      siteMetadata {
        siteDescription: description
        siteTitle: title
        siteUrl
        siteImage
      }
    }
  }
`
export default function Seo({
  title,
  locale,
  description,
  children,
  url,
  image,
  path
}) {
  const {
    site: {
      siteMetadata: { siteDescription, siteUrl, siteTitle, siteImage },
    },
  } = useStaticQuery(query)
  // Check if last character is slash, remove trailing slash
  const lastChar = path[path.length-1];
  lastChar === "/" && (path = path.slice(0,-1))

  const metaDescription = description || siteDescription
  const metaTitle = title || siteTitle
  const metaUrl = url || `${siteUrl}${path}`
  const metaImage = image || `${siteUrl}${siteImage}`
  return (
    <Helmet
      title={`${title} - ${siteTitle}`}
      htmlAttributes={locale ? { lang: locale } : { lang: "en-US" }}
      link={[
        {
          rel: "canonical",
          href: metaUrl,
        }
      ]}
      meta={[
        {
          name: "description",
          content: metaDescription,
        },
        {
          property: "og:title",
          content: metaTitle,
        },
        {
          property: "og:image",
          content: metaImage,
        },
        {
          property: "og:description",
          content: metaDescription,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:url",
          content: metaUrl,
        },
        {
          property: "twitter:card",
          content: "summary",
        },
        {
          property: "twitter:image",
          content: metaImage,
        },
        
      ]}
    >
      {children}
    </Helmet>
  )
}
