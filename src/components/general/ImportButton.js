import React, { useRef } from "react"
import { Button } from "comp"

const ImportButton = ({ children, onChange, type = "outline", size = "small", }) => {
	const inputRef = useRef()
	const handleClick = () => {
		inputRef.current.click()
	}

	return (
		<>
			<div style={{ display: "none" }}>
				<input ref={inputRef} type="file" onChange={onChange} />
			</div>
			<Button type={type} size={size} onClick={handleClick}>
				{children}
			</Button>
		</>
	)
}

export default ImportButton
