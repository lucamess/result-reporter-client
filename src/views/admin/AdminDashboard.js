import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil"
import { Space } from "comp"
import StudentSection from "./StudentSection"
import TeacherSection from "./TeacherSection"
import { getAllStudents, getAllTeachers } from "src/api"
import { adminInfoState, studentsState, teachersState } from "src/states"
import { links } from "src/config"
import useAuthProtected from "src/hooks/useAuthProtected"

const fetchToastOptions = {
	loading: <h6>Downloding data from server...</h6>,
	success: <strong>Data loaded</strong>,
	error: <strong>Please check your internet connection</strong>
}

const Logout = () => {
	const navigate = useNavigate()
	const [, setAdminInfo] = useRecoilState(adminInfoState)

	useEffect(() => {
		setAdminInfo({})
		navigate(links.adminLogin)
	})
}

const AdminDashboard = () => {
	useAuthProtected("admin")

	const menuItems = [
		{ label: "Students", comp: () => <StudentSection />, },
		{ label: "Teachers", comp: () => <TeacherSection /> },
		{ label: "Divider", divider: true },
		{ label: "Logout", comp: () => <Logout /> },
	]

	const [adminInfo] = useRecoilState(adminInfoState)
	const [ , setStudents ] = useRecoilState(studentsState)
	const [ , setTeachers ] = useRecoilState(teachersState)
	const [selMenu, setSelMenu] = useState(menuItems[0])

	const handleMenu = (item) => () => {
		setSelMenu(item)
	}

	useEffect(() => {
		toast.promise(
			Promise.all([
				getAllStudents(adminInfo),
				getAllTeachers(adminInfo),
			])
				.then(([students, teachers]) => {
					setStudents(students)
					setTeachers(teachers)
				}),
			fetchToastOptions
		)
	}, [])

	return (
		<Container>
			<Sidebar>
				<ColoredBlock />
				<Space h="2rem" />
				<MenuItems>
					{menuItems.map(item => 
						item.divider ? <MenuDivider key={item.label} /> :
						<MenuItem key={item.label}
							active={item.label == selMenu.label}
							onClick={handleMenu(item)}>{item.label}</MenuItem>
					)}
				</MenuItems>
			</Sidebar>
			<Main>
				{selMenu.comp && selMenu.comp()}
			</Main>
		</Container>
	)
}

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
`

const MenuDivider = styled.div`
	border-bottom: 1px solid #818181;
`

const MenuItem = styled.div`
	color: #ddd;
	font-size: 1.2rem;
	cursor: pointer;
	text-transform: capitalize;

	:hover {
		color: #fff;
		font-weight: bold;
	}

	${props => props.active && css`
		color: var(--secondary);
		font-weight: bold;
	`}
`

const MenuItems = styled.div`
	display: flex;
	flex-direction: column;
	margin: 1rem 2rem;
	gap: 2rem;
`

export default AdminDashboard
