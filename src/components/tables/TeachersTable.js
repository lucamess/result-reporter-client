import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { TableEmptyState, Button, Space, ImportButton } from "comp"
import { ButtonGroup, TableContainer, HeaderRow, BodyRow, HeaderCell, BodyCell, InputBodyCell } from "./Cells"
import DeleteIcon from "src/icons/Delete"
import { getTeachersFromExcel, generateId } from "src/utils"

export const TeachersTable = ({ teachers, schoolCode, onChange }) => {
	const [editMode, setEditMode] = useState(false)
	const [edittedTeachers, setEdittedTeachers] = useState(teachers)
	
	const handleSave = (replace) => {
		setEditMode(false)
		onChange(edittedTeachers, replace)
	}

	const handleImport = (e) => {
		getTeachersFromExcel(e.target.files, schoolCode)
			.then(importedTeachers => {
				setEdittedTeachers(importedTeachers)
				handleSave(true)
			})
	}

	useEffect(() => setEdittedTeachers(teachers), [teachers])

	return (
		<Container>
			{
			editMode == true ?
				<ButtonGroup>
					<ImportButton onChange={handleImport}>Import excel</ImportButton>
					<Button type="outline" size="small"
						onClick={() => {
							setEdittedTeachers(addEmptyTeacher(schoolCode))
						}}>
						Add new teacher
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

			{teachers.length || editMode == true ? (
				editMode == true?
					<TeachersTableEditable
						teachers={edittedTeachers}
						onInput={(teacherId, field) => (e) => {
							setEdittedTeachers(editTeacher(teacherId, field, e.target.value))
						}}
						onDel={teacherId => () => {
							setEdittedTeachers(delTeacher(teacherId))
						}} />
				:
					<TeachersTableView teachers={teachers} />
			) : <TableEmptyState />}
		</Container>
	)

}

export const TeachersTableView = ({ teachers }) => {
	return (
		<TableContainer>
			<HeaderRow>
				<HeaderCell style={{ width: "300px" }}>Teacher Name</HeaderCell>
				<HeaderCell style={{ width: "300px" }}>Email</HeaderCell>
				<HeaderCell>Password</HeaderCell>
				<HeaderCell>Subjects</HeaderCell>
			</HeaderRow>
			{teachers.map(teacher => (
				<BodyRow key={teacher.name}>
					<BodyCell style={{ width: "300px" }}>{teacher.name}</BodyCell>
					<BodyCell style={{ width: "300px" }}>{teacher.email}</BodyCell>
					<BodyCell>{teacher.password}</BodyCell>
					<BodyCell>{teacher.subjectsAllowed.join(",")}</BodyCell>
				</BodyRow>
			))}
		</TableContainer>
	)
}


export const TeachersTableEditable = ({ teachers, onInput, onDel }) => {

	return (
		<>
		<Space h="1rem" />
		<TableContainer>
			<HeaderRow>
				<HeaderCell style={{ width: "300px" }}>Teacher Name</HeaderCell>
				<HeaderCell style={{ width: "300px" }}>Email</HeaderCell>
				<HeaderCell>Password</HeaderCell>
				<HeaderCell>Subjects</HeaderCell>
				<HeaderCell>Actions</HeaderCell>
			</HeaderRow>
			{teachers.map(teacher => (
				<BodyRow key={teacher.teacherId}>
					<InputBodyCell style={{ width: "300px" }}
						placeholder="Teacher name" value={teacher.name}
						onChange={onInput(teacher.teacherId, "name")} />

					<InputBodyCell style={{ width: "300px" }}
						value={teacher.email} placeholder="Email"
						onChange={onInput(teacher.teacherId, "email")} />

					<InputBodyCell value={teacher.password} placeholder="Password"
						onChange={onInput(teacher.teacherId, "password")} />

					<InputBodyCell value={teacher.subjectsAllowed.join(",")} placeholder="Subjects"
						onChange={onInput(teacher.teacherId, "subjectsAllowed")} />

					<BodyCell>
						<DeleteIcon style={{ cursor: "pointer" }} size="1.5rem"
							onClick={onDel(teacher.teacherId)} />
					</BodyCell>
				</BodyRow>
			))}
		</TableContainer>

		</>
	)
}

const addEmptyTeacher = (schoolCode) => prevTeachers => {
	return [
		...prevTeachers,
		{
			name: "",
			email: "",
			teacherId: generateId(),
			password: Math.floor(100000 + Math.random() * 900000),
			subjectsAllowed: [],
			schoolCode,
		}
	]
}

const delTeacher = teacherId => prevTeachers => {
	return prevTeachers.filter(curTeacher => curTeacher.teacherId != teacherId)
}

const editTeacher = (teacherId, field, value) => prevTeachers => {
	return prevTeachers.map(curTeacher => {
		if(curTeacher.teacherId != teacherId)
			return curTeacher

		if(field == "subjectsAllowed")
			return ({
				...curTeacher,
				[field]: value.replace(" ", "").split(","),
			})

		return ({
			...curTeacher,
			[field]: value,
		})
	})
}


const Container = styled.div`
	display: flex;
	flex-direction: column;
	width: min-content;
`


