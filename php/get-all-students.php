<?php
require_once "connect.php";
require_once "login-fns.php";

$creds = json_decode($_POST["creds"]);
if(login_admin($conn, $creds->email, $creds->password) == false) {
	mysqli_close($conn);
	die(print_auth_error());
}

$query = "SELECT * FROM students";
$result = mysqli_query($conn, $query) or die("cheger again abo");
$students = [];

while($row = mysqli_fetch_assoc($result)) {
	$row = (object) $row;
	array_push($students, (object) [
		"studentId" => $row->studentId,
		"studentCode" => $row->studentCode,
		"password" => $row->password,
		"name" => $row->name,
		"grade" => $row->grade,
		"section" => $row->section,
		"schoolCode" => $row->schoolCode
	]);
}

mysqli_close($conn);
die(print_data_success($students));

?>
