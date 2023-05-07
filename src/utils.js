import { sectionLetters, errMessages } from "src/config"
import { read } from "xlsx"


export const nullFn = () => null

export const createGradeSectionList = (nOfSections) => {
	const gradeSectionList = {}
	Object.keys(nOfSections).forEach(grade => {
		gradeSectionList[grade] = sectionLetters.slice(0, nOfSections[grade])
	})

	return gradeSectionList
}

export const removeDups = arr => [...new Set(arr)]

export const getExamCodeList = (entries) => {
	return removeDups(entries.map(entry => entry.examCode))
}

export const generateId = (length = 32) => {
	let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const getGradeAndSectionFromClass = className => {
	return [className.slice(0, -1), className.slice(-1)]
}

const sheetToTeachers = (sheet, schoolCode) => {
	const teachers = []

	let row = 2
	while(sheet["B" + row]) {
		const teacherId = generateId()
		const name = sheet["B" + row].v
		const email = sheet["C" + row].v
		const password = sheet["D" + row].v
		const subjectsAllowed = sheet["E" + row].v.replace(" ", "").split(",")

		teachers.push({
			teacherId, name, email, password, subjectsAllowed, schoolCode,
		})
	}

	return teachers
}

const sheetToStudents = (sheet, sheetName, schoolCode) => {
	const students = []
	const [grade, section] = getGradeAndSectionFromClass(sheetName)

	let row = 2
	while(sheet["B" + row]) {
		const name = sheet["B" + row].v
		const studentCode = sheet["C" + row].v
		const password = sheet["D" + row].v
		const studentId = generateId()

		students.push({
			studentId, name, studentCode, password, grade, section, schoolCode
		})
	}

	return students
}

const sheetToEntries = (sheet, sheetName, teacherId, examCode, schoolCode) => {
	const entries = []
	const letters = "DEFGHIJKLMNOPQRSTUVWXYZ".split("")
	const [grade, section] = getGradeAndSectionFromClass(sheetName)
	
	let row = 2
	while(sheet["B" + row]) {
		const name = sheet["B" + row].v
		const studentCode = sheet["C" + row].v
		const marks = {}
		const entryId = generateId()
		const byTeacherId = teacherId

		let colIndex = 0
		while(sheet[letters[colIndex] + row]) {
			const subject = sheet[letters[colIndex] + 1].v
			const mark = sheet[letters[colIndex] + row].v
			marks[subject] = mark
			colIndex++
		}

		row++

		entries.push({ entryId, byTeacherId, marks, examCode,
			name, studentCode, grade, section, schoolCode })
	}

	return entries
}

const excelToStudents = (data, schoolCode) => {
	const workbook = read(data)
	let students = []
	workbook.SheetNames.forEach(sheetName => {
		const sheet = workbook.Sheets[sheetName]
		students = [
			...students,
			...sheetToStudents(sheet, sheetName, schoolCode)
		]
	})

	return students
}

export const excelToEntries = (data, teacherId, examCode, schoolCode) => {
	const workbook = read(data)
	let entries = []
	workbook.SheetNames.forEach(sheetName => {
		const sheet = workbook.Sheets[sheetName]
		entries = [
			...entries,
			...sheetToEntries(sheet, sheetName, teacherId, examCode, schoolCode),
		]
	})

	return entries
}

export const excelToTeachers = (data, schoolCode) => {
	const workbook = read(data)
	let teachers = []
	workbook.SheetNames.forEach(sheetName => {
		const sheet = workbook.Sheets[sheetName]
		teachers = [
			...teachers,
			...sheetToTeachers(sheet, schoolCode),
		]
	})

	return teachers
}

export const readFile = file => {
	return new Promise((res) => {
		const reader = new FileReader()
		reader.onload = e => {
			res(e.target.result)
		}
		reader.readAsArrayBuffer(file)
	})
}

const mergeArrLists = entryArrList => {
	let entries = []
	entryArrList.forEach(entryArr => {
		entries = [
			...entries,
			...entryArr,
		]
	})

	return entries
}

export const getEntriesFromExcel = (files, teacherId, examCode, schoolCode) => {
	return Promise.all(Array.from(files).map(file => {
		return readFile(file)
			.then(data => {
				return excelToEntries(data, teacherId, examCode, schoolCode)
			})
	}))
		.then(mergeArrLists)

}

export const getStudentsFromExcel = (files, schoolCode) => {
	return Promise.all(Array.from(files).map(file => {
		return readFile(file)
			.then(data => excelToStudents(data, schoolCode))
	}))
		.then(mergeArrLists)
}

export const getTeachersFromExcel = (files, schoolCode) => {
	return Promise.all(Array.from(files).map(file => {
		return readFile(file)
			.then(data => excelToTeachers(data, schoolCode))
	}))
		.then(mergeArrLists)
}


export const sleep = (ms) => (value) => {
	return new Promise((res) => {
		setTimeout(() => res(value), ms)
	})
}

const matchEntryId = entry => ({ entryId }) =>
	entry.entryId == entryId

const findEntryInColl = (coll, entry) =>
	coll.find(matchEntryId(entry))

export const mergeEntriesWithPriority = (oldEntries, edittedEntries, grade, section, examCode) => {
	const updateEdits = oldEntries.map(oldEntry => {
		const edittedEntry = findEntryInColl(edittedEntries, oldEntry)

		return edittedEntry || oldEntry
	})

	const addedEntries = edittedEntries.filter(edittedEntry => 
		false == !!findEntryInColl(oldEntries, edittedEntry)
	)

	const updateAdds = [
		...addedEntries,
		...updateEdits,
	]

	const delStudentIds = oldEntries
		.filter(({ grade: oGrade, section: oSection, examCode: oExamCode }) =>
			oGrade == grade && oSection == section && oExamCode == examCode
		)
		.filter(oldEntry =>
			false == !!findEntryInColl(edittedEntries, oldEntry)
		)
		.map(entry => entry.entryId)

	const updateDels = updateAdds.filter(({ entryId }) =>
		false == delStudentIds.includes(entryId)
	)

	return updateDels
}

const matchStudentId = student => ({ studentId }) =>
	student.studentId == studentId

const findStudentInColl = (coll, student) =>
	coll.find(matchStudentId(student))

export const mergeStudentsWithPriority = (oldStudents, edittedStudents, grade, section) => {
	const updateEdits = oldStudents.map(oldStudent => {
		const edittedStudent = findStudentInColl(edittedStudents, oldStudent)

		return edittedStudent || oldStudent
	})

	const addedStudents = edittedStudents.filter(edittedStudent => {
		return false == !!findStudentInColl(oldStudents, edittedStudent)
	})

	const updateAdds = [
		...addedStudents,
		...updateEdits,
	]

	const delStudentIds = oldStudents
		.filter(({ grade: oGrade, section: oSection }) => oGrade == grade && oSection == section)
		.filter(oldStudent => {
			return false == !!findStudentInColl(edittedStudents, oldStudent)
		})
		.map(student => student.studentId)


	const updateDels = updateAdds.filter(({ studentId }) =>
		delStudentIds.includes(studentId) == false)

	console.log("addedStudents", addedStudents)
	console.log("delStudentIds", delStudentIds)

	return updateDels
}

const matchTeacherId = teacher => ({ teacherId }) =>
	teacher.teacherId == teacherId

const findTeacherInColl = (coll, teacher) =>
	coll.find(matchTeacherId(teacher))

export const mergedTeachersWithPriority = (oldTeachers, edittedTeachers) => {
	const updateEdits = oldTeachers.map(oldTeacher => {
		const edittedTeacher = findTeacherInColl(edittedTeachers, oldTeacher)

		return edittedTeacher || oldTeacher
	})

	const addedTeachers = edittedTeachers.filter(edittedTeacher => {
		return false == !!findTeacherInColl(oldTeachers, edittedTeacher)
	})

	const updateAdds = [
		...addedTeachers,
		...updateEdits,
	]

	const delTeacherIds = oldTeachers
		.filter(oldTeacher => {
			return false == !!findTeacherInColl(edittedTeachers, oldTeacher)
		})
		.map(teacher => teacher.teacherId)


	const updateDels = updateAdds.filter(({ teacherId }) =>
		delTeacherIds.includes(teacherId) == false)

	console.log("addedTeachers", addedTeachers)
	console.log("delTeacherIds", delTeacherIds)

	return updateDels
}

export const translateError = err => {
	return errMessages[err] || 
		(console.log("unk cheger", err) && "Unknown error occured please try again later")
}



