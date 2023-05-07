import styled from "styled-components"

export const Input = styled.input`
	box-sizing: border-box;
	background: #fff;
	border: 1px solid #ddd;
	box-shadow: 0px 1px 5px rgba(0,0,0,0.1);
	border-radius: 8px;
	padding: 0.7rem 1rem;
	color: #363636;
`


export const InputMultiple = styled(Input).attrs({ as: "textarea" })`
	font-family: sans-serif;
`

export const Select = styled(Input).attrs({ as: "select" })`
`


