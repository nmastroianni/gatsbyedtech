import * as React from "react"
import {
  ContentGrid,
  FullWidthImage,
  ImageHighlight,
  SectionHeading,
  Text,
  YouTubeHighlight,
} from "../slices"

export default function SliceZone({ sliceZone }) {
  const sliceComponents = {
    content_grid: ContentGrid,
    full_width_image: FullWidthImage,
    // image_gallery: ImageGallery,
    image_highlight: ImageHighlight,
    // quote: Quote,
    section_heading: SectionHeading,
    text: Text,
    youtube_highlight: YouTubeHighlight,
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
