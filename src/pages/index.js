import * as React from "react"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import GreenHeading from "../components/GreenHeading"
import EdtechWave from "../components/EdtechWave"

export default function Home({ path }) {
  return (
    <Layout path={path}>
      <Hero />
      <GreenHeading
        text="Catch the Latest in Our EdTech Wave"
        name="edtech-wave"
      />
      <EdtechWave />
      <GreenHeading text="Our Most Recent Videos" name="recent-videos" />
    </Layout>
  )
}
