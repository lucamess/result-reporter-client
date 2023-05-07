<?php

function login_admin($conn, $email, $password) {
	$query = "SELECT * FROM teachers WHERE "
		. "`email` = '" . mysqli_real_escape_string($conn, $email) . "'"
		. " AND "
		. "`password` = '" .mysqli_real_escape_string($conn, $password) . "'";

	$result = mysqli_query($conn, $query);
	$teacher = mysqli_fetch_assoc($result);
	if($teacher) {
		$teacher["subjectsAllowed"] = json_decode($teacher["subjectsAllowed"]);
	}

	return $teacher;
}

function login_student($conn, $studentCode, $password) {
	$query = "SELECT * FROM students WHERE "
		. "`studentCode` = '" . mysqli_real_escape_string($conn, $studentCode) . "'"
		. " AND "
		. "`password` = '" .mysqli_real_escape_string($conn, $password) . "'";

	$result = mysqli_query($conn, $query);
	$student = mysqli_fetch_assoc($result);

	return $student;
}

function print_auth_error() {
	$result = array(
		"success" => false,
		"message" => "AUTH_ERROR"
	);

	return json_encode($result);
}

function print_op_success() {
	$result = array(
		"success" => true
	);

	return json_encode($result);
}

function print_data_success($data) {
	$result = array(
		"success" => true,
		"result" => $data
	);

	return json_encode($result);
}


?>
