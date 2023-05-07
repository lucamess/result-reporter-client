<?php
require_once "connect.php";
require_once "login-fns.php";

$creds = json_decode($_POST["creds"]);
$data = json_decode($_POST["q"]);

if(login_admin($conn, $creds->email, $creds->password) == false) {
	mysqli_close($conn);
	die(print_auth_error());
}

$query = "DELETE FROM students";
mysqli_query($conn, $query);

foreach($data as $student) {
	$query = "INSERT INTO students"
		. "(`studentId`, `studentCode`, `password`, `name`, `grade`, `section`, `schoolCode`)"
		. " VALUES ("
		. "'" . mysqli_real_escape_string($conn, $student->studentId) . "', "
		. "'" . mysqli_real_escape_string($conn, $student->studentCode) . "', "
		. "'" . mysqli_real_escape_string($conn, $student->password) . "', "
		. "'" . mysqli_real_escape_string($conn, $student->name) . "', "
		. "'" . mysqli_real_escape_string($conn, $student->grade) . "', "
		. "'" . mysqli_real_escape_string($conn, $student->section) . "', "
		. "'" . mysqli_real_escape_string($conn, $student->schoolCode) . "')";

	mysqli_query($conn, $query);
}


mysqli_close($conn);
die(print_op_success());

?>
