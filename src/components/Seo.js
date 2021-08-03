import * as React from "react"
import { Helmet } from "react-helmet"

export default function SEO({ children }) {
  return <Helmet>{children}</Helmet>
}
