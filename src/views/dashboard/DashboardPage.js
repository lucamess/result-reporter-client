import React, { useState } from "react"
import styled from "styled-components"
import { useRecoilState } from "recoil"

import { H2, H7, H4, H5, FlexGrow, Select, Space } from "comp"
import { studentInfoState, resultEntriesState } from "src/states"
import { getExamCodeList } from "src/utils"

const DashboardPage = () => {
	const [ { studentName } ] = useRecoilState(studentInfoState)
	const [ resultEntries ] = useRecoilState(resultEntriesState)
	const examCodeList = getExamCodeList(resultEntries)
	const [selExamCode, setSelExamCode] = useState(examCodeList[0])
	const { markList } = resultEntries.filter(entry => entry.examCode == selExamCode)[0]

	const handleExamCode= e => {
		setSelExamCode(e.target.value)
	}

	return (
		<Container>
			<Headerbar>
				<H2>Hello, {studentName}</H2>
			</Headerbar>
			<Mainbar>
				<H5>Recent exams</H5>
				<Space h="1rem" />
				<SelectBig onChange={handleExamCode} value={selExamCode}>
					{examCodeList.map(examCode => (
						<option key={examCode} value={examCode}>{examCode}</option>
					))}
				</SelectBig>

				<Space h="1rem" />
				<MarkListC>
					{Object.keys(markList).map(subject => (
						<Mark key={subject}>
							<strong>{subject}: </strong><FlexGrow />{markList[subject]}
						</Mark>
					))}
				</MarkListC>
			</Mainbar>
		</Container>
	)
}

const Headerbar = styled.div`
	display: flex;
	background: #143967;
	padding: 6rem 2rem 1rem 2rem;
	color: #eee;
	border-bottom-left-radius: 2rem;
	border-bottom-right-radius: 2rem;
`

const Mainbar = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2rem;
	color: #242424;
`

const Container = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	max-width: 500px;
`
const MarkListC = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2rem 3rem;
	gap: 1rem;
	border-radius: 16px;
	border: 1px solid #ddd;
	box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
	background: #f0f0ff;
`

const Mark = styled(H7)`
	display: flex;
`

const SelectBig = styled(Select)`
	font-size: 1.1rem;
	font-weight: bold;
`

export default DashboardPage


