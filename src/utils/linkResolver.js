exports.linkResolver = doc => {
  if (doc.type === "post") {
    return `/blog/${doc.uid}`
  }
  if (doc.type === "tool") {
    return `/tools/${doc.uid}`
  }
  if (doc.type === "page") {
    return `/${doc.uid}`
  }
  if (doc.type === "video") {
    return `/videos/${doc.uid}`
  }
  return "/"
}
