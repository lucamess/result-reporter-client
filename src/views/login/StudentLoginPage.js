import React from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import toast from "react-hot-toast"

import StudentLoginForm from "./StudentLoginForm"
import { entriesState, studentInfoState } from "src/states"
import { loginStudent } from "src/api"
import { links } from "src/config"

const fetchToastOptions = {
	loading: "Logging in...",
	success: <strong>Logged in successfully</strong>,
	error: <strong>Incorrect student code (ID number) or password</strong>,
}


const StudentLoginPage = () => {
	const [ , setEntries ] = useRecoilState(entriesState)
	const [ , setStudentInfo ] = useRecoilState(studentInfoState)
	const navigate = useNavigate()

	const handleSubmit = (creds) => {
		toast.promise(
			loginStudent(creds)
				.then(({ entries, student }) => {
					setEntries(entries)
					setStudentInfo(student)
					navigate(links.studentDashboard)
				}),
			fetchToastOptions)
	}

	return (
		<Container>
			<StudentLoginForm onSubmit={handleSubmit} />
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2rem 2rem;
	margin: 0 auto;
	max-width: 500px;
`

export default StudentLoginPage


