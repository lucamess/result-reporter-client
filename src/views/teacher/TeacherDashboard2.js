import React, { useState, useEffect } from "react"
import styled from "styled-components"
import toast from "react-hot-toast"
import { useRecoilState } from "recoil"
import { EntriesTable, Space, H7, Select } from "comp"
import { gradeList, sectionLetters, examCodeList, schoolCode } from "src/config"
import { adminInfoState, entriesState } from "src/states"
import { getEntriesForTeacher, postEntries } from "src/api"
import { mergeEntriesWithPriority } from "src/utils"
import useAuthProtected from "src/hooks/useAuthProtected"


 const fetchToastOptions = {
	loading: <h6>Downloding data from server...</h6>,
	success: <strong>Data loaded</strong>,
	error: <strong>Please check your internet connection</strong>
 }

const saveToastOptions = {
	loading: "Uploading data...",
	success: <strong>Data uploaded successfully</strong>,
	error: <strong>Server is busy please try again later</strong>,
}

const TeacherDashboard = () => {
	useAuthProtected("teacher")

	const [adminInfo] = useRecoilState(adminInfoState)
	const [entries, setEntries] = useRecoilState(entriesState)

	const [selEntries, setSelEntries] = useState(entries)
	const [selGrade, setSelGrade] = useState(12)
	const [selSection, setSelSection] = useState("G")
	const [selExamCode, setSelExamCode] = useState(examCodeList[0])

	const handleSave = (edittedEntries, replace) => {
		const mergedEntries = replace
			? edittedEntries
			: mergeEntriesWithPriority(entries, edittedEntries, selGrade, selSection, selExamCode)

		setEntries(mergedEntries)
		toast.promise(postEntries(adminInfo, mergedEntries), saveToastOptions)
	}

	useEffect(() => {
		const newSelEntries = entries.filter(entry =>
			entry.grade == selGrade &&
			entry.section == selSection &&
			entry.examCode == selExamCode
		)

		setSelEntries(newSelEntries)
	}, [selGrade, selSection, selExamCode, entries])

	useEffect(() => {
		toast.promise(
			Promise.all([
				getEntriesForTeacher(adminInfo)
			])
				.then(([entriesFromServer]) => {
					setEntries(entriesFromServer)
				}),
			fetchToastOptions
		)
			.catch(err => {
				console.log("Cheger when fetching entries", err)
			})
	}, [])

	return (
		<Container>
			<Sidebar>
				<ColoredBlock />
				<Space h="2rem" />
				<ClassSelect
					grade={selGrade} section={selSection} examCode={selExamCode}
					setGrade={setSelGrade}
					setSection={setSelSection}
					setExamCode={setSelExamCode} />
			</Sidebar>
			<Main>
				<h2>Marklist of {selExamCode} for {selGrade}{selSection}</h2>
				<EntriesTable
					entries={selEntries}
					grade={selGrade}
					section={selSection}
					examCode={selExamCode}
					teacherId={adminInfo.teacherId}
					schoolCode={schoolCode}
					onChange={handleSave}
					subjects={adminInfo.subjectsAllowed}
				/>
			</Main>
		</Container>
	)
}

const ClassSelect = ({ grade, section, examCode, setGrade, setSection, setExamCode }) => {
	const handleChange = set => e => {
		set(e.target.value)
	}

	return (
		<ClassSelectC>
			<H7 color="#ccc">Grade:</H7>
			<Space h="0.5rem" />
			<ClassSelectInput onChange={handleChange(setGrade)} value={grade}>
				{gradeList.map(grade => (
					<option key={grade} value={grade}>Grade {grade}</option>
				))}
			</ClassSelectInput>

			<Space h="1rem" />
			<H7 color="#ccc">Section:</H7>
			<ClassSelectInput onChange={handleChange(setSection)} value={section}>
				{sectionLetters.map(section => (
					<option key={section} value={section}>Section {section}</option>
				))}
			</ClassSelectInput>

			<Space h="1rem" />
			<H7 color="#ccc">Exam:</H7>
			<ClassSelectInput onChange={handleChange(setExamCode)} value={examCode}>
				{examCodeList.map(examCode =>
					<option key={examCode} value={examCode}>{examCode}</option>
				)}
			</ClassSelectInput>

		</ClassSelectC>
	)
}

const ClassSelectC = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1rem;
`

const ClassSelectInput = styled(Select)`
	background: #545454;
	color: #ddd;
`

const Container = styled.div`
	display: flex;
`

const Sidebar = styled.div`
	display: flex;
	flex-direction: column;
	width: 20%;
	background: #363636;
	min-height: 100vh;
`

const ColoredBlock = styled.div`
	height: 80px;
	background: var(--primary-lighter);
`

const Main = styled.div`
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	min-height: 100vh;
	padding: 3rem;
`
export default TeacherDashboard
