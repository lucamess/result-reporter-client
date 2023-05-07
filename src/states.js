import { atom } from "recoil"


export const studentInfoState = atom({
	key: "studentInfo",
	default: {},
})

export const adminInfoState = atom({
	key: "adminInfo",
	default: {},
	// default: {
	// 	teacherId: 1, name: "Yodahe", email: "yodahe@gmail.com", password: 100100, subjectsAllowed: "Amharic,English,Math" 
	// },
})

export const entriesState = atom({
	key: "entries",
	default: [
		{
			studentId: 1, name: "Euel", studentCode: 1000, grade: "12", section: "G",
			examCode: "Test 1", marks: { "Amharic": 9, "English": 8, "Math": 10 },
			byTeacherId: 1, entryId: 1,
		},
	],
})

export const studentsState = atom({
	key: "students",
	default: [
		{ studentId: 1, name: "Euel", studentCode: 1000, password: 100100, grade: "12", section: "G", schoolCode: 1},
		{ studentId: 2, name: "Yohana", studentCode: 2000, password: 200200, grade: "12", section: "G", schoolCode: 1},
		{ studentId: 3, name: "Roben", studentCode: 3000, password: 300300, grade: "12", section: "D" , schoolCode: 1},
	]
})

export const teachersState = atom({
	key: "teachers",
	default: [
		{ teacherId: 1, name: "Yodahe", email: "yodahe@gmail.com", password: 100100, subjectsAllowed: "Maths,Physics" },
	]
})
