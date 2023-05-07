import React, { useState, useEffect } from "react"
import styled from "styled-components"

export const ResultEntriesTable = ({ entries }) => {
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
						<BodyCell key={subject}>{entry.markList[subject] || 0}</BodyCell>
					))}
				</BodyRow>
			))}
		</Container>
	)
}


const editEntries = (studentCode, subject, value) => prevEntries => {
	return prevEntries.map(entry => {
		if(entry.studentCode != studentCode)
			return entry

		return ({
			...entry,
			markList: {
				...entry.markList,
				[subject]: value,
			}
		})
	})
}

export const ResultEntriesTableEditable = ({ entries, setEntries }) => {
	const subjectList = Object.keys(entries[0].markList)
	const handleInput = (studentCode, subject) => e => {
		setEntries(editEntries(studentCode, subject, e.target.value))
	}


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
						<InputBodyCell
							key={subject}
							value={entry.markList[subject]}
							onChange={handleInput(entry.studentCode, subject)} />
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

const HeaderCell = styled.div`
	padding: 1rem;
	width: 120px;
	font-weight: bold;
	border: 1px solid #aaa;
`

const BodyCell = styled.div`
	padding: 1rem;
	width: 120px;
`

const InputBodyCell = styled.input`
	padding: 1rem;
	width: 120px;
	background: #f0f0ff;
`

