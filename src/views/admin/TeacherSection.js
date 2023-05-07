import React from "react"
import styled from "styled-components"
import toast from "react-hot-toast"
import { useRecoilState } from "recoil"
import { TeachersTable, Space } from "comp"
import { teachersState, adminInfoState } from "src/states"
import { postTeachers } from "src/api"
import { mergeTeachersWithPriority } from "src/utils"
import { schoolCode } from "src/config"


const saveToastOptions = {
	loading: "Uploading data...",
	success: <strong>Data uploaded successfully</strong>,
	error: <strong>Server is busy please try again later</strong>,
}


const TeacherSection = () => {
	const [teachers, setTeachers] = useRecoilState(teachersState)
	const [adminInfo] = useRecoilState(adminInfoState)

	const handleSave = (edittedTeachers, replace) => {
		const mergedTeachers = replace
			? edittedTeachers
			: mergeTeachersWithPriority(teachers, edittedTeachers)

		setTeachers(mergedTeachers)
		toast.promise(postTeachers(adminInfo, mergedTeachers), saveToastOptions)
	}

	return (
		<Container>
			<h2>Teachers list</h2>
			<Space h="1rem" />
			<TeachersTable teachers={teachers} schoolCode={schoolCode} onChange={handleSave} />
		</Container>
	)
}


const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 3rem;
`


export default TeacherSection

