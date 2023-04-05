import React, { useState } from "react"
import styled from "styled-components"
import { Button, H2, Space, Input, Select, Subtitle } from "comp"
import { sectionLetters, gradeList, nullFn } from "src/config"


const defaultInitVal = {
	grade: gradeList[0],
	section: sectionLetters[0],
	studentCode: "",
}
const LoginForm = ({ initValue = defaultInitVal, onSubmit = nullFn }) => {

	const [selectedGrade, setSelectedGrade] = useState(initValue.grade)
	const [selectedSection, setSelectedSection] = useState(initValue.section)
	const [studentCode, setStudentCode] = useState(initValue.studentCode)

	const handleInputChange = set => e => {
		set(e.target.value)
	}

	const handleSubmit = () => {
		const creds = {
			grade: selectedGrade,
			section: selectedSection,
			studentCode: studentCode,
		}

		onSubmit(creds)
	}

	return (
		<Container>
			<img src="https://newaychallenge.com/images/logo.jpg" />
			<Space h="1rem" />
			<H2>Enter your class and student code</H2>
			<Space h="2rem" />

			{/* Grade level */}
			<Subtitle>Grade level</Subtitle>
			<Space h="0.5em" />
			<Select onChange={handleInputChange(setSelectedGrade)} value={selectedGrade}>
				{gradeList.map(grade => (
					<option key={grade} value={grade}>Grade {grade}</option>
				))}
			</Select>

			{/* Sections */}
			<Space h="2em" />
			<Subtitle>Section</Subtitle>
			<Space h="0.5em" />
			<Select onChange={handleInputChange(setSelectedSection)} value={selectedSection}>
				{sectionLetters.map(section => (
					<option key={section} value={section}>{selectedGrade}{section}</option>
				))}
			</Select>

			{/* Student code */}
			<Space h="2em" />
			<Subtitle>Student bank code</Subtitle>
			<Space h="0.5em" />
			<Input placeholder="Type code here" value={studentCode}
				onChange={handleInputChange(setStudentCode)} />

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

