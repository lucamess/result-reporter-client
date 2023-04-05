import React from "react"
import styled from "styled-components"

const ResultEntriesTable = ({ entries }) => {
	const subjectList = Object.keys(entries[0].markList)
	return (
		<Container>
			<HeaderRow>
				<HeaderCell style={{ width: "300px" }}>Student Name</HeaderCell>
				{subjectList.map(subject => (
					<HeaderCell key={subject}>{subject}</HeaderCell>
				))}
			</HeaderRow>
			{entries.map(entry => (
				<BodyRow key={entry.studentName}>
					<BodyCell style={{ width: "300px" }}>{entry.studentName}</BodyCell>
					{subjectList.map(subject => (
						<BodyCell key={subject}>{entry.markList[subject]}</BodyCell>
					))}
				</BodyRow>
			))}
		</Container>
	)
}


const Container = styled.div`
	display: flex;
	flex-direction: column;
`

const HeaderRow = styled.div`
	display: flex;
	border: 2px solid #aaa;
`

const BodyRow = styled.div`
	display: flex;
	border: 1px solid #ccc;
`

const BodyCell = styled.div`
	padding: 1rem 2rem;
	width: 80px;
`

const HeaderCell = styled.div`
	padding: 1rem 2rem;
	width: 80px;
	font-weight: bold;
`

export default ResultEntriesTable
