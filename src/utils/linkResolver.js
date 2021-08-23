exports.linkResolver = doc => {
  // console.log(doc)
  if (doc.type === "post") {
    return `/blog/${doc.uid}`
  }
  return "/"
}
