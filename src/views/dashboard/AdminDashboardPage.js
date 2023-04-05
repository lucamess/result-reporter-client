import React, { useState, useEffect } from "react"
import styled from "styled-components"
import toast from "react-hot-toast"
import { useRecoilState } from "recoil"

import { H1, TableEmptyState, SidebarClassSelector, H7, UploadButton, FlexGrow, ResultEntriesTable, Subtitle, Space, Select } from "comp"
import { resultEntriesState, adminInfoState } from "src/states"
import { sectionLetters, gradeList, schoolCode, examCodeList } from "src/config"
import { parseExcelFiles } from "src/utils"
import { postResultEntries } from "src/api"

const AdminDashboardPage = () => {
	const [ adminInfo ] = useRecoilState(adminInfoState)
	const [ resultEntries, setResultEntries ] = useRecoilState(resultEntriesState)
	const [ selExamCode, setSelExamCode ] = useState(examCodeList[0])
	const [ [selGrade, selSection], setClass ] = useState([gradeList[0], sectionLetters[0]])

	const [filEntries, setFilEntries] = useState(resultEntries)

	const handleInputChange = set => e => {
		set(e.target.value)
	}

	const handleFileSelect = (e) => {
		toast.promise(
			parseExcelFiles(e.target.files, selExamCode, schoolCode)
				.then(entries => {
					setResultEntries(entries)
					return postResultEntries(adminInfo, entries)
				}),
			{
				loading: "Uploading excel...",
				success: <strong>Data uploaded successfully</strong>,
				error: <strong>Server is busy please try again later</strong>,
			}
		)
	}

	const updateTable = () => {
		setFilEntries(
			resultEntries.filter(entry =>
				entry.grade == selGrade &&
				entry.section == selSection &&
				entry.examCode == selExamCode)
		)
	}


	useEffect(() => { updateTable() }, [selGrade, selSection, selExamCode, resultEntries])

	return (
		<Container>
			<Sidebar>
				<SidebarClassSelector onChange={setClass} />
			</Sidebar>
			<Main>
				<H1 color="#242424">Administration Dashboard</H1>
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
					<UploadButton onChange={handleFileSelect}>Upload Excel</UploadButton>
				</Toolbar>


				<Space h="2rem" />
				<H7>Grade {selGrade}{selSection} - {selExamCode}</H7>
				<Space h="1rem" />
				{filEntries.length ?
					<ResultEntriesTable entries={filEntries} /> :
					<TableEmptyState />}
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

export default AdminDashboardPage
