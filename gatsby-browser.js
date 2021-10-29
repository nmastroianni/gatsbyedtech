import "./src/styles/global.css"
import * as React from "react"
import {
  PrismicPreviewProvider,
  componentResolverFromMap,
} from "gatsby-plugin-prismic-previews"
import { linkResolver } from "./src/utils/linkResolver"
import PageTemplate from "./src/pages/{PrismicPage.url}"
import PostTemplate from "./src/pages/{PrismicPost.url}"
import ToolTemplate from "./src/pages/{PrismicTool.url}"

export const wrapRootElement = ({ element }) => (
  <PrismicPreviewProvider
    repositoryConfigs={[
      {
        repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
        linkResolver,
        componentResolver: componentResolverFromMap({
          page: PageTemplate,
          post: PostTemplate,
          tool: ToolTemplate,
        }),
      },
    ]}
  >
    {element}
  </PrismicPreviewProvider>
)
