import * as React from "react"
import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { HiMenu } from "react-icons/hi"
import {
  FaVideo,
  FaTools,
  FaFontAwesomeFlag,
  FaCode,
  FaCampground,
  FaNewspaper,
  FaHome,
  FaQuestionCircle,
} from "react-icons/fa"

const query = graphql`
  {
    allGoogleSheetMenuItems {
      nodes {
        text
        type
        url
        icon
        id
      }
    }
  }
`

export default function HeadlessMenu(props) {
  const {
    allGoogleSheetMenuItems: { nodes },
  } = useStaticQuery(query)
  return (
    <div className="w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus:ring-4 focus:ring-green-300 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <span className="sr-only">Menu</span>
            <HiMenu
              className="w-5 h-5 text-white hover:text-green-100"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 text-white">
              {nodes.map(node => {
                const icons = {
                  Tools: FaTools,
                  Video: FaVideo,
                  Flag: FaFontAwesomeFlag,
                  Code: FaCode,
                  Campground: FaCampground,
                  Blog: FaNewspaper,
                }
                const MenuIcon = icons[node.icon]
                if (node.type === "internal") {
                  return (
                    <Menu.Item key={node.id}>
                      {({ active }) => (
                        <Link
                          to={node.url}
                          className={`${
                            active
                              ? "bg-green-900 hover:text-white focus:text-white"
                              : "text-gray-900 "
                          } ${
                            props.path.includes(node.url) &&
                            `border-b-2 bg-green-200 text-black font-semibold shadow-sm `
                          } focus:text-white group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <MenuIcon
                              className="w-5 h-5 mr-2"
                              aria-hidden="true"
                            />
                          ) : (
                            <MenuIcon
                              className="w-5 h-5 mr-2 text-green-900"
                              aria-hidden="true"
                            />
                          )}
                          {node.text}
                        </Link>
                      )}
                    </Menu.Item>
                  )
                } else {
                  return (
                    <Menu.Item key={node.id}>
                      {({ active }) => (
                        <a
                          href={node.url}
                          className={`${
                            active ? "bg-blue-700 text-white" : "text-gray-900"
                          } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        >
                          {active ? (
                            <MenuIcon
                              className="w-5 h-5 mr-2"
                              aria-hidden="true"
                            />
                          ) : (
                            <MenuIcon
                              className="w-5 h-5 mr-2 text-green-900"
                              aria-hidden="true"
                            />
                          )}
                          {node.linkText}
                        </a>
                      )}
                    </Menu.Item>
                  )
                }
              })}
            </div>
            <div className="px-1 py-1">
              {props.path !== "/" && (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/"
                        className={`${
                          active ? "bg-blue-700 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <FaHome className="w-5 h-5 mr-2" aria-hidden="true" />
                        ) : (
                          <FaHome
                            className="w-5 h-5 mr-2 text-green-900"
                            aria-hidden="true"
                          />
                        )}
                        Home
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/join"
                        className={`${
                          active ? "bg-blue-700 text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        {active ? (
                          <FaQuestionCircle
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        ) : (
                          <FaQuestionCircle
                            className="w-5 h-5 mr-2"
                            aria-hidden="true"
                          />
                        )}
                        Ask Us a Question
                      </Link>
                    )}
                  </Menu.Item>
                </>
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
