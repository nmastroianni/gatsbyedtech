import * as React from "react"
import {
  FullWidthImage,
  ImageHighlight,
  SectionHeading,
  Text,
  ToolsGrid,
} from "../slices"

export default function SliceZone({ sliceZone }) {
  const sliceComponents = {
    full_width_image: FullWidthImage,
    // image_gallery: ImageGallery,
    image_highlight: ImageHighlight,
    // quote: Quote,
    section_heading: SectionHeading,
    text: Text,
    tool_grid: ToolsGrid,
    // youtube: YouTubeSingle,
  }

  const sliceZoneContent = sliceZone.map((slice, index) => {
    const SliceComponent = sliceComponents[slice.slice_type]
    if (SliceComponent) {
      return <SliceComponent slice={slice} key={`slice-${index}`} />
    }
    return null
  })

  return <>{sliceZoneContent}</>
}
