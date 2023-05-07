import React, { useState, useEffect } from "react"
import styled from "styled-components"
import toast from "react-hot-toast"
import { useRecoilState } from "recoil"
import { StudentsTable, Space, Select, FlexGrow } from "comp"
import { sectionLetters, gradeList, schoolCode, } from "src/config"
import { studentsState, adminInfoState } from "src/states"
import { postStudents } from "src/api"
import { mergeStudentsWithPriority } from "src/utils"


const saveToastOptions = {
	loading: "Uploading data...",
	success: <strong>Data uploaded successfully</strong>,
	error: <strong>Server is busy please try again later</strong>,
}


const StudentSection = () => {
	const [students, setStudents] = useRecoilState(studentsState)
	const [adminInfo] = useRecoilState(adminInfoState)

	const [selStudents, setSelStudents] = useState(students)
	const [selGrade, setSelGrade] = useState(12)
	const [selSection, setSelSection] = useState("G")

	const handleSave = (edittedStudents, replace) => {
		const mergedStudents = replace
			? edittedStudents
			: mergeStudentsWithPriority(students, edittedStudents, selGrade, selSection)

		setStudents(mergedStudents)
		toast.promise(postStudents(adminInfo, mergedStudents), saveToastOptions)
	}

	useEffect(() => {
		console.log("students in useEffect", students)
		const newSelStudents = students.filter(student => 
			student.grade == selGrade &&
			student.section == selSection)

		setSelStudents(newSelStudents)
	} , [selGrade, selSection, students]) 

	return (
		<Container>
			<h2>Students list</h2>
			<Toolbar>
				<ClassSelect
					grade={selGrade} section={selSection} schoolCode={schoolCode}
					setGrade={setSelGrade} setSection={setSelSection} />
				<FlexGrow />
			</Toolbar>

			<Space h="1rem" />
			<StudentsTable grade={selGrade} section={selSection} schoolCode={schoolCode}
				students={selStudents} onChange={handleSave} />
		</Container>
	)
}

const ClassSelect = ({ grade, section, setGrade, setSection }) => {
	const handleChange = set => e => {
		set(e.target.value)
	}

	return (
		<ClassSelectC>
			<Select onChange={handleChange(setGrade)} value={grade}>
				{gradeList.map(grade => (
					<option key={grade} value={grade}>Grade {grade}</option>
				))}
			</Select>
			<Space w="0.5rem" />
			<Select onChange={handleChange(setSection)} value={section}>
				{sectionLetters.map(section => (
					<option key={section} value={section}>{section}</option>
				))}
			</Select>
		</ClassSelectC>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 3rem;
`

const ClassSelectC = styled.div`
	display: flex;
`

const Toolbar = styled.div`
	display: flex;
	flex-direction: row;
`

export default StudentSection

