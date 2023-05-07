import axios from "axios"
import { sleep } from "src/utils"
import { serverBaseUrl } from "src/config"
// import { mockDataResultEntries } from "src/mock.js"



// fetch, with exception
// export const getResultEntries = ({ grade, section, studentCode }) => {
// 	return axiosInstance.get(`rest/students?q={"grade": "${grade}", "section": "${section}", "studentCode": "${studentCode}"}`, { headers: { "x-apikey": "6429775139cf552ef728bf6c" } })
// 		.then(res => {
// 			if(res.data.length == 0)
// 				throw "error"
// 			return ({
// 				entries: res.data,
// 				studentInfo: res.data[0] || { grade, section, studentCode },
// 			})
// 		})
// }


// fetch, without restirction
// export const getAllResultEntries = ({ email, password }) => {
// 	let adminInfo = {}
// 	return axiosInstance.get('rest/admins?q={"email": "' + email + '", "password": "' + password + '"}', { headers: { "x-apikey": "6429775139cf552ef728bf6c" } })
// 		.then(res => {
// 			if(res.data.length == 0) {
// 				throw "Incorrect creds"
// 			}
// 			adminInfo = res.data[0]
// 			return adminInfo
// 		})
// 		.then(() => axiosInstance.get("rest/students?q={}", { headers: { "x-apikey": "6429775139cf552ef728bf6c" } }))
// 		.then(res => {
// 			console.log("get-all", res.data)
// 			return ({
// 				adminInfo,
// 				entries: res.data
// 			})
// 		})
// }


// post idk
// export const postResultEntries = (creds, entries) => {
// 	return axiosInstance.delete("rest/students/*?q={}", { headers: { "x-apikey": "12e697b3ed820e7c5ab4640873b16d4f5648c" } })
// 		.catch(() => null)
// 		.then(axiosInstance.post("rest/students", entries, { headers: { "x-apikey": "6429775139cf552ef728bf6c" } }))
// 		.then(res => {
// 			console.log("added", res.data)
// 		})
// 		.then(sleep(2000))
// 		.catch(() => "good")
// }

const sendRequest = (url, obj) => {
	const bodyFormData = new FormData()
	Object.keys(obj).forEach(key => {
		bodyFormData.append(key, JSON.stringify(obj[key]))
	})

	return axios({
		method: "post",
		url: serverBaseUrl + url,
		data: bodyFormData,
		headers: { "Content-Type": "multipart/form-data" },
	})
		.then(response => {
			console.log(response.data)
			return response.data
		})
		.catch(err => {
			console.log("cheger on network", err)
			return ({ success: false, message: "NETWORK_ERROR" })
		})
		.then(({ success, message, result }) => {
			if(success == false) {
				throw message
			} else {
				return result
			}
		})
}

export const loginAdmin = (creds) => {
	console.log("login admin", creds)
	return sendRequest("login-admin.php", { creds })

	// return Promise.resolve({
	// 	teacherId: 1,
	// 	name: "Tesfaye",
	// 	email: "tesfaye@gmail.com",
	// 	password: "1234",
	// 	schoolCode: 1,
	// 	subjectsAllowed: "",
	// 	type: "admin"
	// })
}

export const loginStudent = (creds) => {
	console.log("student login", creds)
	return sendRequest("login-student.php", {
		creds,
	})
}

export const postStudents = (creds, students) => {
	console.log("post students", creds, students)
	return sendRequest("post-students.php", {
		creds, q: students,
	})
}

export const postTeachers = (creds, teachers) => {
	console.log("post teachers", creds, teachers)
	return sendRequest("post-teachers.php", {
		creds, q: teachers,
	})
}

export const postEntries = (creds, entries) => {
	console.log("post entries", creds, entries)
	return sendRequest("post-entries.php", {
		creds, q: entries,
	})
}
export const getAllStudents = (creds) => {
	console.log("get all students", creds)
	return sendRequest("get-all-students.php", { creds })
}
export const getAllTeachers = (creds) => {
	console.log("get all teachers", creds)
	return sendRequest("get-all-teachers.php", { creds })
}
export const getEntriesForTeacher = (creds) => {
	console.log("get entries for teacher", creds)
	return sendRequest("get-entries-for-teacher.php", { creds })
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
