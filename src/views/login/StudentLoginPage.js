import React from "react"
import styled from "styled-components"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import toast from "react-hot-toast"

import StudentLoginForm from "./StudentLoginForm"
import { resultEntriesState, studentInfoState } from "src/states"
import { getResultEntries } from "src/api"
import { links } from "src/config"

const StudentLoginPage = () => {
	const [ , setResultEntries ] = useRecoilState(resultEntriesState)
	const [ , setStudentInfo ] = useRecoilState(studentInfoState)
	const navigate = useNavigate()

	const handleSubmit = (creds) => {
		toast.promise(
			getResultEntries(creds)
			.then(({ entries, studentInfo }) => {
				setResultEntries(entries)
				setStudentInfo(studentInfo)
				navigate(links.studentDashboard)
			}),
			{
				loading: "Logging in...",
				success: <strong>Logged in successfully</strong>,
				error: <strong>Incorrect student code (ID number)</strong>,
			}
		)
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


