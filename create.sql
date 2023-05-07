CREATE TABLE students(
    studentId VARCHAR(255) PRIMARY KEY,
    studentCode VARCHAR(255),
    password VARCHAR(255),
    name VARCHAR(255),
    grade VARCHAR(10),
    section VARCHAR(10),
    schoolCode VARCHAR(255)
);

CREATE TABLE entries(
	entryId VARCHAR(255) PRIMARY KEY,
	byTeacherId VARCHAR(255),

	name VARCHAR(255),
	studentCode VARCHAR(255),
    grade VARCHAR(10),
    section VARCHAR(10),
    schoolCode VARCHAR(255),

	examCode VARCHAR(255),
	marks TEXT
);

CREATE TABLE teachers(
	teacherId VARCHAR(255) PRIMARY KEY,
	name VARCHAR(255),
	email VARCHAR(255),
	password VARCHAR(255),
	schoolCode VARCHAR(255),
	subjectsAllowed TEXT
);

