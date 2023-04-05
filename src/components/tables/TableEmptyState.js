import React from "react"
import styled from "styled-components"

import NoDataIcon from "src/icons/NoData"
import { H4 } from "comp"

const TableEmptyState = () => {
	return (
		<Container>
			<NoDataIcon size="15rem" />
			<H4 color="#242424">Nothing in here, upload excel</H4>
		</Container>
	)
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	align-items: center;
	padding: 4rem;
`

export default TableEmptyState

