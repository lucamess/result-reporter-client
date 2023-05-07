import styled from "styled-components"

export const ButtonGroup  = styled.div`
	display: flex;
	gap: 1rem;
	align-self: flex-end;
`

export const TableContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: min-content;
	border: 1px solid #ccc;
	border-radius: 4px;
`

export const HeaderRow = styled.div`
	display: flex;
`

export const BodyRow = styled.div`
	display: flex;
`

export const HeaderCell = styled.div`
	padding: 1rem;
	width: 120px;
	font-weight: bold;
	border-bottom: 1px solid #ccc;
`

export const BodyCell = styled.div`
	padding: 1rem;
	width: 120px;
	border-bottom: 1px solid #ccc;
`

export const InputBodyCell = styled.input`
	padding: 1rem;
	width: 120px;
	background: #f0f0ff;
	border: 0;
	border-bottom: 1px solid #ccc;
`
