import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"

import { H8 } from "comp"
import { sectionLetters, gradeList, } from "src/config"

const SidebarClassSelector = ({ onChange }) => {
	const [selGrade, setSelGrade] = useState(gradeList[0])
	const [selSection, setSelSection] = useState(sectionLetters[0])
	const selectGrade = grade => () => {
		setSelGrade(grade)
	}
	const selectSection = section => () => {
		setSelSection(section)
	}
	
	useEffect(() => {
		onChange([selGrade, selSection])
	}, [selGrade, selSection])

	return (
		<Container>
			{gradeList.map(grade => 
				<Grade key={grade} selected={selGrade == grade} onClick={selectGrade(grade)}>
					<H8 bold>Grade {grade}</H8>
					<SectionList visible={selGrade == grade}>
						{sectionLetters.map(section => 
							<Section key={section} selected={selSection == section}
								onClick={selectSection(section)}>
								{section}
							</Section>
						)}
					</SectionList>
				</Grade>
			)}
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
`

const Grade = styled.div`
	padding: 1rem;
	border: 1px solid #636363;
	margin: 0.5em 0;
	border-radius: 16px;
	color: #eee;
	cursor: pointer;

	:hover {
		background: #545454;
	}

	${props => props.selected && css`
		background: #363636;
	`}
`

const SectionList = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-top: 1rem;

	${props => props.visible == false && css`
		display: none;
	`}
`
const Section = styled.div`
	display: flex;
	justify-content: center;
	padding: 1rem;
	background: #242424;
	color: #ddd;
	border-radius: 16px;
	min-width: 80px;

	${props => props.selected && css`
		background: var(--secondary);
		font-weight: bold;
	`}
`

export default SidebarClassSelector
