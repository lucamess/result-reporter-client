import { sectionLetters } from "src/config"
import { read, utils } from "xlsx"

export const nullFn = () => null

export const createGradeSectionList = (nOfSections) => {
	const gradeSectionList = {}
	Object.keys(nOfSections).forEach(grade => {
		gradeSectionList[grade] = sectionLetters.slice(0, nOfSections[grade])
	})

	return gradeSectionList
}

export const removeDups = arr => [...new Set(arr)]

export const getExamCodeList = (resultEntries) => {
	return removeDups(resultEntries.map(entry => entry.examCode))
}

const getGradeAndSectionFromClass = className => {
	return [className.slice(0, -1), className.slice(-1)]
}

const sheetToEntries = (sheet, grade, section, examCode, schoolCode) => {
	const entries = []
	const letters = "DEFGHIJKLMNOPQRSTUVWXYZ".split("")
	
	let row = 2
	while(sheet["B" + row]) {
		const studentName = sheet["B" + row].v
		const studentCode = sheet["C" + row].v
		const markList = {}

		console.log("jamal", studentName, studentCode)

		let colIndex = 0
		while(sheet[letters[colIndex] + row]) {
			const subject = sheet[letters[colIndex] + 1].v
			const mark = sheet[letters[colIndex] + row].v
			markList[subject] = mark
			colIndex++
		}

		row++

		entries.push({ studentName, studentCode, grade, section, markList, examCode, schoolCode })
	}

	return entries
}

export const excelToEntries = (data, examCode, schoolCode) => {
	const workbook = read(data)
	let entries = []
	workbook.SheetNames.forEach(className => {
		console.log(className)
		const [grade, section] = getGradeAndSectionFromClass(className)
		const sheet = workbook.Sheets[className]
		entries = [
			...entries,
			...sheetToEntries(sheet, grade, section, examCode, schoolCode),
		]
	})

	return entries
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

export const parseExcelFiles = (files, selExamCode, schoolCode) => {
	return Promise.all(Array.from(files).map(file => {
		return readFile(file)
			.then(data => {
				return excelToEntries(data, selExamCode, schoolCode)
			})
	}))
		.then(entryArrList => {
			let entries = []
			entryArrList.forEach(entryArr => {
				entries = [
					...entries,
					...entryArr,
				]
			})

			return entries
		})

}

export const sleep = (ms) => (value) => {
	return new Promise((res) => {
		setTimeout(() => res(value), ms)
	})
}



