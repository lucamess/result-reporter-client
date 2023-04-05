import React from "react"
import styled from "styled-components"
import { useRecoilState } from "recoil"
import { useParams, useNavigate } from "react-router-dom"

import { H7, H4, Space, FlexGrow, Button } from "comp"
import ArrowLeftIcon from "src/icons/ArrowLeft"
import { resultEntriesState } from "src/states"

const ResultPage = () => {
	const { examCode } = useParams()
	const navigate = useNavigate()
	const [ resultEntries ] = useRecoilState(resultEntriesState)
	const { markList } = resultEntries.filter(entry => entry.examCode == examCode)[0]
	return (
		<Container>
			<Button type="text" style={{ alignSelf: "flex-start" }} onClick={() => navigate(-1)}>
				<ArrowLeftIcon />
				Back
			</Button>

			<H4>{examCode} results</H4>
			<Space h="2rem" />

			<MarkListC>
				{Object.keys(markList).map(subject => (
					<Mark key={subject}>
						<strong>{subject}: </strong><FlexGrow />{markList[subject]}
					</Mark>
				))}
			</MarkListC>

		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2rem 2rem;
	margin: 0 auto;
	width: 500px;
`

const MarkListC = styled.div`
	display: flex;
	flex-direction: column;
	padding: 2rem 4rem;
	gap: 1rem;
	border-radius: 16px;
	border: 1px solid #ddd;
`

const Mark = styled(H7)`
	display: flex;
`

export default ResultPage

