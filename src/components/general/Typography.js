import styled, { css } from "styled-components"

const Typography = styled.div`
	${props => props.bold && css`
		font-weight: bold;
	`}
	${props => props.inline && css`
		display: inline;
	`}
	${props => props.center && css`
		text-align: center;
	`
	}
	color: ${props => props.color || "inherent"};
`

export const H0 = styled(Typography)`
	font-size: 4rem;

	@media screen and (max-width: 64em) {
		font-size: 2.5rem;
	}
`

export const H05 = styled(Typography)`
	font-size: 3rem;

	@media screen and (max-width: 64em) {
		font-size: 2.5rem;
	}
`

export const H1 = styled(Typography)`
	font-size: 2.2rem;
`

export const H2 = styled(Typography)`
	font-size: 1.9rem;
`

export const H3 = styled(Typography)`
	font-size: 1.8rem;
`

export const H4 = styled(Typography)`
	font-size: 1.7rem;
`

export const H5 = styled(Typography)`
	font-size: 1.6rem;
`

export const H6 = styled(Typography)`
	font-size: 1.4rem;
`

export const H7 = styled(Typography)`
	font-size: 1.25rem;
`

export const H8 = styled(Typography)`
	font-size: 1.15rem;
`

export const Subtitle = styled(Typography)`
	font-size: 1.1rem;
`

export const Text = styled(Typography)`
	font-size: 1rem;
`

export const Subtext = styled(Typography)`
	font-size: 0.9rem;
`

