import * as React from "react"
import { Helmet } from "react-helmet"
import axios from "axios"
import { useState } from "react"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import { useForm } from "react-hook-form"

export default function Help({ path }) {
  const [disabled, setDisabled] = useState(false)
  const [formComplete, setFormComplete] = useState(false)
  const [recaptchaPassed, setRecaptchaPassed] = useState(null)
  const selectReason = [
    "Something Google Related",
    "Seesaw",
    "Mote",
    "Coding",
    "Video",
    "Volunteer to Write a Blog Post",
    "Website Issue",
    "Other...",
  ]
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const submitData = async (values, recaptchaToken) => {
    setDisabled(true)
    try {
      const { name, email, reason, question } = values
      await axios({
        url: "/api/get-help",
        method: "POST",
        data: {
          name,
          email,
          reason,
          question,
          recaptchaToken,
        },
      }).then(res => {
        if (res.status === 200) {
          reset()
          setFormComplete(true)
          setDisabled(false)
        } else {
          setRecaptchaPassed(false)
        }
      })
    } catch (error) {
      if (error.response) {
        console.log("Server responded with non 2xx code: ", error.response.data)
      } else if (error.request) {
        console.log("No response received: ", error.request)
      } else {
        console.log("Error setting up response: ", error.message)
      }
    }
  }
  const onSubmit = async values => {
    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute(process.env.GATSBY_RECAPTCHA_SITE_KEY, { action: "submit" })
        .then(token => {
          submitData(values, token)
        })
    })
  }

  return (
    <Layout path={path}>
      <Helmet>
        <script
          key="recaptcha"
          type="text/javascript"
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.GATSBY_RECAPTCHA_SITE_KEY}`}
        />
      </Helmet>
      <Seo
        url="https://edtechwave.com/help"
        title="Help"
        description="Tell us how we can help you. We are waiting to hear from you!"
      />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <header className="mb-2 sm:mb-4 lg:mb-6 flex flex-col items-center">
          <div>
            <h1 className="font-teko text-6xl my-3 md:my-4 lg:my-6 text-emerald-800 dark:text-emerald-200">
              Get Help
            </h1>
          </div>
          <h2 className="text-sm dark:text-emerald-200 text-gray-700 max-w-screen-sm">
            We are here to help. Tell us what you need.
          </h2>
        </header>
        <hr />
        <section className="max-w-screen-sm mx-auto my-3 sm:my-4 md:my-5 lg:my-6">
          {recaptchaPassed === false && (
            <p className="text-center text-red-600 text-xl border border-red-600 p-4 rounded-md">
              Hmm... this doesn't happen often. Google found this submission to
              be suspicious and labled it as possible spam.
            </p>
          )}
          {formComplete && (
            <div>
              <h2 className="text-center text-3xl font-teko text-emerald-800 dark:text-emerald-200">
                Huzzah! Your message was received!
              </h2>
              <p className="prose dark:prose-dark prose-lg lg:prose-xl text-center">
                Please give us up to 24 hours to respond.
              </p>
              <button
                onClick={() => setFormComplete(!formComplete)}
                className="mt-3 block mx-auto text-center items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-emerald-800 dark:bg-emerald-200 dark:text-emerald-900 hover:bg-emerald-900 dark:hover:bg-emerald-100 focus:outline-none focus:border-emerald-200 focus:shadow-outline-blue active:bg-emerald-200 transition ease-in-out duration-150"
              >
                Contact Us Again
              </button>
            </div>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={`${formComplete && `hidden`} max-w-lg mx-auto`}
          >
            <label
              htmlFor="name"
              className="font-semibold text-lg text-emerald-800 dark:text-emerald-200 block"
            >
              What is your name?
            </label>
            <input
              name="name"
              type="text"
              // placeholder="Example: Jane Appleseed"
              {...register("name", {
                required: "Your name is required.",
              })}
              className="form-input block w-full mb-3 px-0.5 py-2 font-medium border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 rounded-sm transition duration-150 ease-in-out dark:bg-transparent dark:text-white"
            />
            {errors.name && (
              <p className="text-red-700 dark:text-yellow-300">
                {" "}
                &uarr; {errors.name.message}
              </p>
            )}
            <label
              htmlFor="email"
              className="font-semibold text-lg text-emerald-800 dark:text-emerald-200"
            >
              What is your email address?
            </label>
            <input
              name="email"
              type="email"
              // placeholder="Example: jappleseed@gomc3.org"
              {...register("email", {
                required: "Your email address is required.",
              })}
              className="form-input block w-full mb-3 px-0.5 py-2 font-medium border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 rounded-sm transition duration-150 ease-in-out dark:bg-transparent dark:text-white"
            />
            {errors.email && (
              <p className="text-red-700 dark:text-yellow-300">
                {" "}
                &uarr; {errors.email.message}
              </p>
            )}
            <label
              htmlFor="reason"
              className="font-semibold text-lg text-emerald-800 dark:text-emerald-200"
            >
              What is your reason for contacting us today?
            </label>
            <select
              name="reason"
              {...register("reason", {
                required: "A reason is required.",
                pattern: "^((?!Select).)*$",
              })}
              className="form-select text-gray-500 block w-full mb-3 px-0.5 py-2 font-medium border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 rounded-sm transition duration-150 ease-in-out dark:bg-gray-900 dark:text-white"
            >
              {selectReason.map((reason, i) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
            <label
              htmlFor="question"
              className="font-semibold text-lg text-emerald-800 dark:text-emerald-200"
            >
              How can we help you?
            </label>
            <textarea
              name="question"
              // placeholder="Enter your question or comment here..."
              className="form-textarea block w-full mb-3 px-0.5 font-medium border-2 border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-4 focus:ring-emerald-200 rounded-sm transition duration-150 ease-in-out dark:bg-transparent dark:text-white"
              {...register("question", {
                required: "Your question/comment is required.",
              })}
            />
            {errors.question && (
              <p className="text-red-700 dark:text-yellow-300">
                {" "}
                &uarr; {errors.question.message}
              </p>
            )}
            <input
              name="submit"
              type="submit"
              value="Submit"
              className={`w-1/3 px-6 py-3 mt-6 font-medium rounded-md text-white bg-emerald-800 dark:bg-emerald-200 dark:text-emerald-900 ${
                disabled && ` opacity-40 text-gray-50 `
              } hover:bg-emerald-900 dark:hover:bg-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-200 rounded-sm transition duration-150 ease-in-out`}
            />
            <div className="mt-3 md:mt-4 lg:mt-6 prose prose-sm dark:prose-dark">
              <p>
                This site is protected by reCAPTCHA and the{" "}
                <a href="https://policies.google.com/privacy">
                  Google Privacy Policy
                </a>{" "}
                and{" "}
                <a href="https://policies.google.com/terms">Terms of Service</a>{" "}
                apply.
              </p>
            </div>
          </form>
        </section>
      </div>
    </Layout>
  )
}
