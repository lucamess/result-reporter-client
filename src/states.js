import { atom } from "recoil"

export const resultEntriesState = atom({
	key: "resultEntries",
	default: [],
})

export const studentInfoState = atom({
	key: "studentInfo",
	default: {},
})

export const adminInfoState = atom({
	key: "adminInfo",
	default: {},
})
