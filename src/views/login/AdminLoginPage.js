import React from "react"
import styled from "styled-components"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"

import AdminLoginForm from "./AdminLoginForm"
import { adminInfoState, resultEntriesState } from "src/states"
import { getAllResultEntries } from "src/api"
import { links } from "src/config"

const AdminLoginPage = () => {
	const [ , setAdminInfo ] = useRecoilState(adminInfoState)
	const [ , setResultEntries ] = useRecoilState(resultEntriesState)
	const navigate = useNavigate()

	const handleSubmit = (creds) => {
		toast.promise(
			getAllResultEntries(creds)
				.then(({ adminInfo, entries }) => {
					setAdminInfo(adminInfo)
					setResultEntries(entries)

					navigate(links.adminDashboard)
				}),
			{
				loading: "Logging in...",
				success: <strong>Logged in successfully</strong>,
				error: <strong>Incorrect email or password</strong>,
			}
		)
	}

	return (
		<Container>
			<AdminLoginForm onSubmit={handleSubmit} />
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

export default AdminLoginPage


