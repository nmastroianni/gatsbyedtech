import axios from "axios"
const recaptchaValidation = async ({ recaptchaToken }) => {
  const result = await (async () => {
    try {
      const response = await axios({
        url: "https://www.google.com/recaptcha/api/siteverify",
        method: "POST",
        params: {
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: recaptchaToken,
        },
      })
      return { successful: true, message: response.data.score }
    } catch (error) {
      let message
      if (error.response) {
        message = `reCAPTCHA server responded with non 2xx code: ${error.response.data}`
      } else if (error.request) {
        message = `No reCAPTCHA response received: ${error.request}`
      } else {
        message = `Error setting up reCAPTCHA response: ${error.message}`
      }
      return { successful: false, message }
    }
  })()
  return result
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed")
  } else {
    const { name, email, reason, question, recaptchaToken } = req.body

    const recaptchaValidationResult = await recaptchaValidation({
      recaptchaToken,
    })
    if (!recaptchaValidationResult.successful) {
      // this is sent if the recaptcha was not successful
      res.status(400).send(recaptchaValidationResult.message)
    } else {
      const googleCaptchaScore = Number(recaptchaValidationResult.message)
      // add logic for if the score is above or below desired value
      if (googleCaptchaScore > 0.5) {
        console.log("not likely a bot! score = ", googleCaptchaScore)
        // Do something with Trello here
        res.status(200).send("Action taken")
      } else {
        console.log("this was likely a bot! score = ", googleCaptchaScore)
        // The ReCaptcha score was too low and we are not accepting this submission
        res.status(400).send("Action not taken, possible bot detected.")
      }
      //   if (!sendEmailResult.successful) {
      //     res.status(400).send(sendEmailResult.message)
      //   } else {
      //     res.status(200).send("All good!")
      //   }
    }
  }
}
