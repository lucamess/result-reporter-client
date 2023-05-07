import React, { useState } from "react"
import styled from "styled-components"
import { Button, H2, Space, Input, Subtitle } from "comp"
import { nullFn } from "src/config"


const defaultInitVal = {
	email: "tesfaye@gmail.com",
	password: "1",
}

const AdminLoginForm = ({ initValue = defaultInitVal, onSubmit = nullFn }) => {
	const [email, setEmail] = useState(initValue.email)
	const [password, setPassword] = useState(initValue.password)

	const handleInputChange = set => e => {
		set(e.target.value)
	}

	const handleSubmit = () => {
		const creds = {
			email, password
		}

		onSubmit(creds)
	}

	return (
		<Container>
			<H2>Login to your admin page</H2>

			{/* Email */}
			<Space h="2em" />
			<Subtitle>Email</Subtitle>
			<Space h="0.5em" />
			<Input placeholder="Type your email here" value={email}
				onChange={handleInputChange(setEmail)} type="email" />

			{/* Password */}
			<Space h="2em" />
			<Subtitle>Password</Subtitle>
			<Space h="0.5em" />
			<Input placeholder="Type your password here" value={password}
				onChange={handleInputChange(setPassword)} type="password" />

			<Space h="2rem" />
			<Button onClick={handleSubmit}>
				Login
			</Button>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
`

export default AdminLoginForm

