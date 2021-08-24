exports.linkResolver = doc => {
  if (doc.type === "post") {
    return `/blog/${doc.uid}`
  }
  if (doc.type === "page") {
    return `/${doc.uid}`
  }
  return "/"
}
