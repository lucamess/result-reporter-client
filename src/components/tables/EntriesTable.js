import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { TableEmptyState, Button, Space, ImportButton } from "comp"
import { ButtonGroup, TableContainer, HeaderRow, BodyRow, HeaderCell, BodyCell, InputBodyCell } from "./Cells"
import { getEntriesFromExcel, generateId } from "src/utils"
import DeleteIcon from "src/icons/Delete"

export const EntriesTable = ({ entries, subjects, grade, section, teacherId,
	examCode, schoolCode, onChange }) => {

	const [editMode, setEditMode] = useState(false)
	const [edittedEntries, setEdittedEntires] = useState(entries)

	const handleSave = (replace) => {
		setEditMode(false)
		onChange(edittedEntries, replace)
	}

	const handleImport = (e) => {
		getEntriesFromExcel(e.target.files, teacherId, examCode, schoolCode)
			.then(importedEntries => {
				setEdittedEntires(importedEntries)
				handleSave(true)
			})
	}

	useEffect(() => setEdittedEntires(entries), [entries])
	useEffect(() => {
		if(entries.length == 0)
			setEditMode(true)
	}, [entries])

	return (
		<Container>
			{
			editMode == true ?
				<ButtonGroup>
					<ImportButton onChange={handleImport}>Import excel</ImportButton>
					<Button type="outline" size="small"
						onClick={() => {
							setEdittedEntires(addEmptyEntry(grade, section, examCode,
								schoolCode, teacherId))
						}}>
						Add new entry
					</Button>
					<Button type="outline" size="small"
						onClick={() => setEditMode(false)}>Cancel</Button>
					<Button type="default" size="small" onClick={handleSave}>Save</Button>
				</ButtonGroup>
				:
				<ButtonGroup>
					<Button type="outline" size="small"
						onClick={() => setEditMode(true)}>Edit</Button>
				</ButtonGroup>

			}

			<Space h="1rem" />

			{editMode == true?
				<EntriesTableEditable
					entries={edittedEntries}
					subjects={subjects}
					onDel={entryId => () => {
						setEdittedEntires(delEntry(entryId))
					}}
					onFieldInput={(entryId, subject) => e => {
						setEdittedEntires(editEntryField(entryId, subject, e.target.value))
					}}
					onSubjectInput={(entryId, field) => e => {
						setEdittedEntires(editEntrySubject(entryId, field, e.target.value))
					}} />
					:
				<EntriesTableView subjects={subjects} entries={entries} />
			}
		</Container>
	)

}

const EntriesTableView = ({ entries, subjects }) => {
	return (
		<TableContainer>
			<HeaderRow>
				<HeaderCell style={{ width: "300px" }}>Student Name</HeaderCell>
				<HeaderCell>Code</HeaderCell>
				{subjects.map(subject => 
					<HeaderCell key={subject}>{subject}</HeaderCell>
				)}
			</HeaderRow>
			{entries.map(entry => (
				<BodyRow key={entry.name}>
					<BodyCell style={{ width: "300px" }}>{entry.name}</BodyCell>
					<BodyCell>{entry.studentCode}</BodyCell>
					{subjects.map(subject =>
						<BodyCell key={subject}>{entry.marks[subject] || 0}</BodyCell>
					)}
				</BodyRow>
			))}
		</TableContainer>
	)
}


const EntriesTableEditable = ({ entries, subjects, onSubjectInput, onFieldInput, onDel }) => {
	return entries.length == 0 ? <TableEmptyState width="800px" /> : (
		<>
		<Space h="1rem" />
		<TableContainer>
			<HeaderRow>
				<HeaderCell style={{ width: "300px" }}>Student Name</HeaderCell>
				<HeaderCell>Code</HeaderCell>
				{subjects.map(subject => 
					<HeaderCell key={subject}>{subject}</HeaderCell>
				)}
				<HeaderCell>Actions</HeaderCell>
			</HeaderRow>
			{entries.map(entry => (
				<BodyRow key={entry.entryId}>
					<InputBodyCell style={{ width: "300px" }}
						placeholder="Student Name" value={entry.name}
						onChange={onFieldInput(entry.entryId, "name")} />

					<InputBodyCell placeholder="Code" value={entry.studentCode}
						onChange={onFieldInput(entry.entryId, "studentCode")} />

					{subjects.map(subject =>
						<InputBodyCell key={subject} type="number"
							value={entry.marks[subject] || ""}
							onChange={onSubjectInput(entry.entryId, subject)} />
					)}

					<BodyCell>
						<DeleteIcon style={{ cursor: "pointer" }} size="1.5rem"
							onClick={onDel(entry.entryId)} />
					</BodyCell>
				</BodyRow>
			))}
		</TableContainer>

		</>
	)
}

const editEntryField = (entryId, field, value) => prevEntries => {
	return prevEntries.map(curEntry => {
		if(curEntry.entryId != entryId)
			return curEntry

		return ({
			...curEntry,
			[field]: value,
		})
	})
}

const editEntrySubject = (entryId, subject, value) => prevEntries => {
	return prevEntries.map(curEntry => {
		if(curEntry.entryId != entryId)
			return curEntry

		return ({
			...curEntry,
			marks: {
				...curEntry.marks,
				[subject]: value,
			}
		})
	})
}

const addEmptyEntry = (grade, section, examCode, schoolCode, teacherId) => prevEntries => {
	return [
		...prevEntries,
		{
			name: "", studentCode: "", 
			grade, section, schoolCode, examCode,
			entryId: generateId(), byTeacherId: teacherId,
			marks: {}
		}
	]
}

const delEntry = (entryId) => prevEntries => {
	return prevEntries.filter(curEntry => curEntry.entryId != entryId)
}


const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: min-content;
`

