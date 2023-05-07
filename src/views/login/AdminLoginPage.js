import React from "react"
import styled from "styled-components"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"

import AdminLoginForm from "./AdminLoginForm"
import { adminInfoState } from "src/states"
import { loginAdmin } from "src/api"
import { links } from "src/config"
import { translateError } from "src/utils"


const loginToastOptions = {
	loading: "Logging in...",
	success: <strong>Logged in successfully</strong>,
	error: err => <strong>{translateError(err)}</strong>,
}

const AdminLoginPage = () => {
	const [ , setAdminInfo ] = useRecoilState(adminInfoState)
	const navigate = useNavigate()

	const handleSubmit = (creds) => {
		toast.promise(
			loginAdmin(creds)
				.then((adminInfo) => {
					console.log("adminInfo", adminInfo)
					setAdminInfo(adminInfo)

					if(adminInfo.type == "admin") 
						navigate(links.adminDashboard)
					else
						navigate(links.teacherDashboard)
				}),
			loginToastOptions
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


