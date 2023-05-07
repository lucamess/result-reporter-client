import React, { useState } from "react"
import styled from "styled-components"
import { Button, H2, Space, Input, Subtitle } from "comp"
import { nullFn } from "src/config"


const defaultInitVal = {
	studentCode: "1000",
	password: "669359",
}
const LoginForm = ({ initValue = defaultInitVal, onSubmit = nullFn }) => {

	const [studentCode, setStudentCode] = useState(initValue.studentCode)
	const [password, setPassword] = useState(initValue.password)

	const handleInputChange = set => e => {
		set(e.target.value)
	}

	const handleSubmit = () => {
		const creds = {
			studentCode, password
		}

		onSubmit(creds)
	}

	return (
		<Container>
			<img src="https://newaychallenge.com/images/logo.jpg" />
			<Space h="1rem" />
			<H2>Enter your class and student code</H2>
			<Space h="2rem" />

			{/* Student code */}
			<Space h="2em" />
			<Subtitle>Student bank code</Subtitle>
			<Space h="0.5em" />
			<Input placeholder="Type code here" value={studentCode}
				onChange={handleInputChange(setStudentCode)} />

			{/* Student password */}
			<Space h="2em" />
			<Subtitle>Password</Subtitle>
			<Space h="0.5em" />
			<Input placeholder="Type password here" value={password} type="password"
				onChange={handleInputChange(setPassword)} />

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

export default LoginForm

