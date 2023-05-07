<?php
require_once "connect.php";
require_once "login-fns.php";

$creds = json_decode($_POST["creds"]);
$data = json_decode($_POST["q"]);

if(login_admin($conn, $creds->email, $creds->password) == false) {
	mysqli_close($conn);
	die(print_auth_error());
}

$query = "DELETE FROM entries WHERE `teacherId` = '"
	. mysqli_real_escape_string($conn, $creds->teacherId) . "'";
mysqli_query($conn, $query);

foreach($data as $entry) {
	$marks = json_encode($entry->marks);
	$query = "INSERT INTO entries ("
		. " `entryId`, `byTeacherId`, `name`, `studentCode`, `grade`,"
		. " `section`, `schoolCode`, `examCode`, `marks`"
		. ") VALUES ("
		. "'" . mysqli_real_escape_string($conn, $entry->entryId) . "', "
		. "'" . mysqli_real_escape_string($conn, $entry->byTeacherId) . "', "
		. "'" . mysqli_real_escape_string($conn, $entry->name) . "', "
		. "'" . mysqli_real_escape_string($conn, $entry->studentCode) . "', "
		. "'" . mysqli_real_escape_string($conn, $entry->grade) . "', "
		. "'" . mysqli_real_escape_string($conn, $entry->section) . "', "
		. "'" . mysqli_real_escape_string($conn, $entry->schoolCode) . "', "
		. "'" . mysqli_real_escape_string($conn, $entry->examCode) . "', "
		. "'" . mysqli_real_escape_string($conn, $marks) . "')";

	mysqli_query($conn, $query);
}

mysqli_close($conn);
die(print_op_success());

?>
