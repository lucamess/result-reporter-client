import axios from "axios"
// import { mockDataResultEntries } from "src/mock.js"
import { sleep } from "src/utils"
import { serverBaseUrl } from "src/config"

 const axiosInstance = axios.create({
	baseURL: serverBaseUrl, // baseURL: "http://localhost:5000/",

	// headers: {
	// 	"x-apikey": "12e697b3ed820e7c5ab4640873b16d4f5648c",
	// },
 })


// fetch, with exception
export const getResultEntries = ({ grade, section, studentCode }) => {
	return axiosInstance.get(`rest/students?q={"grade": "${grade}", "section": "${section}", "studentCode": "${studentCode}"}`, { headers: { "x-apikey": "6429775139cf552ef728bf6c" } })
		.then(res => {
			if(res.data.length == 0)
				throw "error"
			return ({
				entries: res.data,
				studentInfo: res.data[0] || { grade, section, studentCode },
			})
		})
}


// fetch, without restirction
export const getAllResultEntries = ({ email, password }) => {
	let adminInfo = {}
	return axiosInstance.get('rest/admins?q={"email": "' + email + '", "password": "' + password + '"}', { headers: { "x-apikey": "6429775139cf552ef728bf6c" } })
		.then(res => {
			if(res.data.length == 0) {
				throw "Incorrect creds"
			}
			adminInfo = res.data[0]
			return adminInfo
		})
		.then(() => axiosInstance.get("rest/students?q={}", { headers: { "x-apikey": "6429775139cf552ef728bf6c" } }))
		.then(res => {
			console.log("get-all", res.data)
			return ({
				adminInfo,
				entries: res.data
			})
		})
}

// post idk
export const postResultEntries = (creds, entries) => {
	return axiosInstance.delete("rest/students/*?q={}", { headers: { "x-apikey": "12e697b3ed820e7c5ab4640873b16d4f5648c" } })
		.catch(() => null)
		.then(axiosInstance.post("rest/students", entries, { headers: { "x-apikey": "6429775139cf552ef728bf6c" } }))
		.then(res => {
			console.log("added", res.data)
		})
		.then(sleep(2000))
		.catch(() => "good")
}

// const handleResponse = res => {
// 	 if(res.data.success == true) {
// 	 	return res.data.results
// 	 } else {
// 	 	console.log("[-] error from fanos server:", res.data.message, res.data.errorList)
// 	 	throw { message: res.data.message, errorList: res.data.errorList }
// 	 }
// }

	// Promise.resolve({
	// 	studentInfo: {
	// 		studentName: "Eya",
	// 	},
	// 	entries: [
	// 		{
	// 			schoolCode: 1,
	// 			studentCode: 1111,
	// 			examCode: "Test 2",
	// 			markList: {
	// 				"Amharic": 8,
	// 				"English": 11,
	// 				"Math": 10,
	// 				"Physics": 12,
	// 				"HPE": 10,
	// 			}
	// 		}
	// 	]})
