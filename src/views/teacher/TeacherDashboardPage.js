import React, { useState, useEffect } from "react"
import styled from "styled-components"
import toast from "react-hot-toast"
import { useRecoilState } from "recoil"

import { Button, H1, TableEmptyState, SidebarClassSelector, H7, ImportButton, FlexGrow, ResultEntriesTable, ResultEntriesTableEditable, Subtitle, Space, Select } from "comp"
import { resultEntriesState, adminInfoState } from "src/states"
import { sectionLetters, gradeList, schoolCode, examCodeList } from "src/config"
import { getEntriesFromExcel} from "src/utils"
import { postResultEntries } from "src/api"

const toastOptions = {
	loading: "Uploading excel...",
	success: <strong>Data uploaded successfully</strong>,
	error: <strong>Server is busy please try again later</strong>,
}

const mergeEntriesWithPriority = (oldEntries, edittedEntries) => {
	return oldEntries.map(oldEntry => {
		let chosenEntry = oldEntry

		edittedEntries.forEach(edittedEntry => {
			if(edittedEntry.studentCode == oldEntry.studentCode &&
				edittedEntry.examCode == oldEntry.examCode) {
				chosenEntry = edittedEntry
			}
		})

		return chosenEntry
	})
}

const TeacherDashboardPage = () => {
	const [ adminInfo ] = useRecoilState(adminInfoState)
	const [ resultEntries, setResultEntries ] = useRecoilState(resultEntriesState)
	const [ selExamCode, setSelExamCode ] = useState(examCodeList[0])
	const [ [selGrade, selSection], setClass ] = useState([gradeList[0], sectionLetters[0]])
	const [ editMode, setEditMode ] = useState(true)

	const [filEntries, setFilEntries] = useState(resultEntries)
	const [edittedEntries, setEdittedEntires] = useState(filEntries)
	const [dataChanged, setDataChanged] = useState(false)

	const handleInputChange = set => e => {
		set(e.target.value)
	}

	const handleEditClick = () => {
		if(editMode == false) { // activate edit mode
			setEditMode(true)
			return
		}

		// save editted entries
		setResultEntries(mergeEntriesWithPriority(resultEntries, edittedEntries))
		setDataChanged(true)
		setEditMode(false)
	}

	const handleFileSelect = (e) => {
		toast.promise(
			getEntriesFromExcel(e.target.files, selExamCode, schoolCode)
				.then(entries => {
					setResultEntries(entries)
				}),
			toastOptions
		)
	}

	const uploadData = () => {
		toast.promise(postResultEntries(adminInfo, resultEntries), toastOptions)
	}

	const updateTable = () => {
		const entries = resultEntries.filter(entry =>
			entry.grade == selGrade &&
			entry.section == selSection &&
			entry.examCode == selExamCode)

		setFilEntries(entries)
		setEdittedEntires(entries)
	}


	useEffect(() => { updateTable() }, [selGrade, selSection, selExamCode, resultEntries])

	return (
		<Container>
			<Sidebar>
				<SidebarClassSelector onChange={setClass} />
			</Sidebar>
			<Main>
				<H1 color="#242424">Teacher Dashboard</H1>
				<Space h="2rem" />
				<Toolbar>
					<Subtitle bold color="#363636">Exam: </Subtitle>
					<Space w="1rem" />
					<Select onChange={handleInputChange(setSelExamCode)} value={selExamCode}>
						{examCodeList.map(examCode => (
							<option key={examCode} value={examCode}>{examCode}</option>
						))}
					</Select>
					<FlexGrow />
					<Button type="outline" onClick={handleEditClick}>{editMode ? "Save" : "Edit"}</Button>
					<Space w="1rem" />
					<ImportButton onChange={handleFileSelect}>Import Excel</ImportButton>
					<Space w="1rem" />
					<Button active={dataChanged} onClick={uploadData}>Upload to server</Button>
				</Toolbar>


				<Space h="2rem" />
				<H7>Grade {selGrade}{selSection} - {selExamCode}</H7>
				<Space h="1rem" />
				{filEntries.length ?
					(
						editMode? 
							<ResultEntriesTableEditable entries={edittedEntries}
								setEntries={setEdittedEntires} />
						:
							<ResultEntriesTable
								entries={filEntries} />
					) : <TableEmptyState />}
			</Main>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: row;
	padding: 2rem;
	margin: 0 auto;
	max-width: 1600px;
	gap: 1rem;
`

const Sidebar = styled.div`
	display: flex;
	flex-direction: column;
	width: 30%;
	background: #484848;
	border-radius: 16px;
	padding: 2rem;
`
const Toolbar = styled.div`
	display: flex;
	align-items: center;
`
const Main = styled.div`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	padding: 2rem;
	border-radius: 16px;
	background: #fff;
`

export default TeacherDashboardPage
