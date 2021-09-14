/**
 * Gatsby Cloud Function for EdTechWave.com/help
 */
// Import axios library for making post requests
import axios from "axios"

/**
 * recaptchaValidation - Retrieves a score from Google based on user's interaction
 * @param {string} recaptchaToken // This is the token received from the clientside ReCaptcha script
 * @returns {object} // Object contains 2 properties 'successful' and 'message'
 */
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
/**
 * createTrelloCard - Creates a Trello card if ReCaptcha not suspicious
 * @param {string} name
 * @param {string} email
 * @param {string} question
 * @param {string} listId
 * @param {array} members
 * @returns {object}
 */
const createTrelloCard = async (name, email, question, listId, members) => {
  const today = new Date()
  const result = await (async () => {
    try {
      const response = await axios.post(
        `https://api.trello.com/1/cards?key=${process.env.TRELLO_API_KEY}&token=${process.env.TRELLO_TOKEN}&idList=${listId}`,
        {
          // Card Title
          name: `Question from ${name}: ${email}`,
          // Card Description/Body
          desc: question,
          // Place the card at the bottom so older cards are near the top
          pos: "bottom",
          // Assign the card to the appropriate person(s)
          idMembers: members,
          // Give the card a 24 hour due date
          due: `${today.setDate(today.getDate() + 1)}`,
          // Apply a red "New" label
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
/**
 * handler - takes the form submission and calls all other functions above
 * @param {object} req
 * @param {object} res
 */
export default async function handler(req, res) {
  // Check if the method is post, if not set res to 405
  if (req.method !== "POST") {
    res.status(405).send("Method not allowed")
  } else {
    // Grab the variables from the request body (sent from the form)
    const { name, email, reason, question, recaptchaToken } = req.body
    // Check if Google thinks this interaction is suspicious
    const recaptchaValidationResult = await recaptchaValidation({
      recaptchaToken,
    })
    // Check if Recaptcha was able to process the interaction
    if (!recaptchaValidationResult.successful) {
      // this is sent if the recaptcha was not successful
      res.status(400).send(recaptchaValidationResult.message)
    } else {
      // Make sure the value returned is numeric
      const googleCaptchaScore = Number(recaptchaValidationResult.message)
      // Arbitrarily setting the threshold of suspicion @ 0.5 adjust as needed
      if (googleCaptchaScore > 0.5) {
        // Since score is above 0.5, we proceed to create the Trello card
        // Set board user ids here
        const lois = "57c8dfa7f3875581df71e4a4"
        const neil = "591ae9043510d2e9bf04bba9"
        // Create static array of board's lists.
        // Will need to manually update if lists are edited/added/removed
        const trelloLists = [
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
        ]
        // Use the user's reason to filter the right list
        // Grab that list's id and members
        // Trigger the createTrelloCard function
        const selectedList = trelloLists.filter(list => list.name === reason)
        const listId = selectedList[0].id
        const cardMembers = selectedList[0].members
        const trelloResult = await createTrelloCard(
          name,
          email,
          question,
          listId,
          cardMembers
        )
        if (trelloResult.message.status === 200) {
          res.status(200).send("Action taken")
        } else {
          res
            .status(400)
            .send(
              "Error with Trello integration. Message not saved. Please try again later."
            )
        }
      } else {
        // The ReCaptcha score was too low and we are not accepting this submission
        res.status(400).send("Action not taken, possible bot detected.")
      }
    }
  }
}
