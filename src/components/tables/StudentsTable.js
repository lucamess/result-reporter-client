import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { TableEmptyState, Button, Space, ImportButton } from "comp"
import DeleteIcon from "src/icons/Delete"
import { ButtonGroup, TableContainer, HeaderRow, BodyRow, HeaderCell, BodyCell, InputBodyCell } from "./Cells"
import { getStudentsFromExcel, generateId } from "src/utils"

export const StudentsTable = ({ students, grade, section, schoolCode, onChange }) => {
	const [editMode, setEditMode] = useState(false)
	const [edittedStudents, setEdittedStudents] = useState(students)
	
	const handleSave = (replace) => {
		setEditMode(false)
		onChange(edittedStudents, replace)
	}

	const handleImport = (e) => {
		getStudentsFromExcel(e.target.files, schoolCode)
			.then(importedStudents => {
				setEdittedStudents(importedStudents)
				handleSave(true)
			})
	}

	useEffect(() => setEdittedStudents(students), [students])

	return (
		<Container>
			{
			editMode == true ?
				<ButtonGroup>
					<ImportButton onChange={handleImport}>Import excel</ImportButton>
					<Button type="outline" size="small"
						onClick={() => {
							setEdittedStudents(addEmptyStudent(grade, section, schoolCode))
						}}>
						Add new student
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

			{students.length || editMode == true ? (
				editMode == true?
					<StudentsTableEditable
						students={edittedStudents}
						onInput={(studentId, field) => (e) => {
							setEdittedStudents(editStudent(studentId, field, e.target.value))
						}}
						onDel={studentId => () => {
							setEdittedStudents(delStudent(studentId))
						}} />
						:
						<StudentsTableView students={students} />
			) : <TableEmptyState />}
		</Container>
	)

}

export const StudentsTableView = ({ students }) => {
	return (
		<TableContainer>
			<HeaderRow>
				<HeaderCell style={{ width: "300px" }}>Student Name</HeaderCell>
				<HeaderCell>Code</HeaderCell>
				<HeaderCell>Password</HeaderCell>
			</HeaderRow>
			{students.map(student => (
				<BodyRow key={student.name}>
					<BodyCell style={{ width: "300px" }}>{student.name}</BodyCell>
					<BodyCell>{student.studentCode}</BodyCell>
					<BodyCell>{student.password}</BodyCell>
				</BodyRow>
			))}
		</TableContainer>
	)
}

export const StudentsTableEditable = ({ students, onInput, onDel }) => {

	return (
		<>
		<Space h="1rem" />
		<TableContainer>
			<HeaderRow>
				<HeaderCell style={{ width: "300px" }}>Student Name</HeaderCell>
				<HeaderCell>Code</HeaderCell>
				<HeaderCell>Password</HeaderCell>
				<HeaderCell>Actions</HeaderCell>
			</HeaderRow>
			{students.map(student => (
				<BodyRow key={students.studentId}>
					<InputBodyCell style={{ width: "300px" }}
						placeholder="Student name" value={student.name}
						onChange={onInput(student.studentId, "name")} />

					<InputBodyCell value={student.studentCode} placeholder="Code"
						onChange={onInput(student.studentId, "studentCode")} />

					<InputBodyCell value={student.password} placeholder="Password"
						onChange={onInput(student.studentId, "password")} />

					<BodyCell>
						<DeleteIcon style={{ cursor: "pointer" }} size="1.5rem"
							onClick={onDel(student.studentId)} />
					</BodyCell>
				</BodyRow>
			))}
		</TableContainer>

		</>
	)
}

const addEmptyStudent = (grade, section, schoolCode) => prevStudents => {
	return [
		...prevStudents,
		{
			name: "",
			studentCode: "",
			studentId: generateId(),
			password: Math.floor(100000 + Math.random() * 900000),
			grade, section, schoolCode,
		}
	]
}

const delStudent = studentId => prevStudents => {
	return prevStudents.filter(curStudent => curStudent.studentId != studentId)
}

const editStudent = (studentId, field, value) => prevStudents => {
	return prevStudents.map(curStudent => {
		if(curStudent.studentId != studentId)
			return curStudent

		return ({
			...curStudent,
			[field]: value,
		})
	})
}



const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: min-content;
`

