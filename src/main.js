import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"

const container =	document.getElementById("app")
const root = createRoot(container)

root.render(<App />)

/* TODO
 * > update the admin method
 * > update the teacher's dashboard
 *
 * */

/* TODO HARDER
 * > adding new entries, in the web, and, from excel
 * > sync students with entries (
 * */

/* TODO IMMEDIATE
 * > should i make the entries table the same?
 * */
