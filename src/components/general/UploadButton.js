import React, { useRef } from "react"
import { Button } from "comp"

const UploadButton = ({ children, onChange }) => {
	const inputRef = useRef()
	const handleClick = () => {
		inputRef.current.click()
	}

	return (
		<>
			<div style={{ display: "none" }}>
				<input ref={inputRef} type="file" onChange={onChange} />
			</div>
			<Button onClick={handleClick}>
				{children}
			</Button>
		</>
	)
}

export default UploadButton
