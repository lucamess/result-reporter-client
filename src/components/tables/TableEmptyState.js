import React from "react"
import styled, { css } from "styled-components"

import NoDataIcon from "src/icons/NoData"
import { H4 } from "comp"

const TableEmptyState = ({ width }) => {
	return (
		<Container width={width}>
			<NoDataIcon size="15rem" />
			<H4 color="#242424">Nothing in here, import data from excel</H4>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	align-items: center;
	padding: 4rem;

	${props => props.width && css`
		width: ${props.width}
	`}
`

export default TableEmptyState

