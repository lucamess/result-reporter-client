import { useRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { adminInfoState, studentInfoState } from "src/states"
import { links } from "src/config"


const useAuthProtected = (type) => {
	const [adminInfo] = useRecoilState(adminInfoState)
	const [studentInfo] = useRecoilState(studentInfoState)
	const navigate = useNavigate()

	if(type == "student" && !studentInfo.name) {
		navigate(links.studentLogin)
	}

	if(type == "teacher" && !adminInfo.name) {
		navigate(links.adminLogin)
	}

	if(type == "admin" && adminInfo.type != "admin") {
		navigate(links.adminLogin)
	}
}

export default useAuthProtected
