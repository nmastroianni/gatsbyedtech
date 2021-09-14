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

const createTrelloCard = async (name, email, question, listId, members) => {
  const today = new Date()
  const result = await (async () => {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/cards?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}&idList=${listId}`,
        {
          name: `Question from ${name}: ${email}`,
          desc: question,
          pos: "bottom",
          idMembers: members,
          due: `${today.setDate(today.getDate() + 1)}`,
          idLabels: ["591af4f7ced82109ffa369cd"],
        },
        {
          method: "POST",
        }
      )
      return { successful: true, message: response }
    } catch (error) {
      console.log(error)
    }
  })()
  return result
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed")
  } else {
    const { name, email, reason, question, recaptchaToken } = req.body
    console.log(reason)
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
        // console.log("not likely a bot! score = ", googleCaptchaScore)
        // Do something with Trello here
        const lois = process.env.TRELLO_LOIS_ID
        const neil = process.env.TRELLO_NEIL_ID
        const trelloLists = [
          {
            id: "61389ace5bc13974fd861cc7",
            name: "Site Content Ideas",
          },
          {
            id: "591c41d61fb4165a2f164ecb",
            name: "Something Google Related",
            members: [lois, neil],
          },
          {
            id: "591c41de34a9ac4d29e2fb75",
            name: "Seesaw",
            members: [lois],
          },
          {
            id: "613f88620463024c3767c9c7",
            name: "Mote",
            members: [lois],
          },
          {
            id: "613f887365ea8177c94c9edb",
            name: "Coding",
            members: [neil],
          },
          {
            id: "613f8874894edc79ab27cc56",
            name: "Video",
            members: [neil],
          },
          {
            id: "613f8b57a6298c6476656556",
            name: "Volunteer to Write a Blog Post",
            members: [lois, neil],
          },
          {
            id: "613f8b77d46b283f8400cb6b",
            name: "Website Issue",
            members: [lois, neil],
          },
          {
            id: "594bba6053ed0a2edc55e58f",
            name: "Other...",
            members: [lois, neil],
          },
          {
            id: "591c41e30f7dd29e350662f6",
            name: "Completed",
          },
        ]
        const selectedList = trelloLists.filter(list => list.name === reason)
        const listId = selectedList[0].id
        const cardMembers = selectedList[0].members
        // const trelloResult = await createTrelloCard(
        //   name,
        //   email,
        //   question,
        //   listId,
        //   cardMembers
        // )
        const today = new Date()
        const axiosResponse = await axios.post(
          `https://api.trello.com/1/cards?idList=${listId}&key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}`,
          {
            name: `Question from ${name}: ${email}`,
            desc: question,
            pos: "bottom",
            idMembers: cardMembers,
            due: `${today.setDate(today.getDate() + 1)}`,
            idLabels: ["591af4f7ced82109ffa369cd"],
          },
          {
            method: "POST",
          }
        )
        console.log(axiosResponse.status)
        if (axiosResponse.status === 200) {
          res.status(200).send("Card Created")
        } else {
          res
            .status(400)
            .send(
              "Error with Trello integration. Message not saved. Please try again later."
            )
        }
      } else {
        // console.log("this was likely a bot! score = ", googleCaptchaScore)
        // The ReCaptcha score was too low and we are not accepting this submission
        res.status(400).send("Action not taken, possible bot detected.")
      }
    }
  }
}
