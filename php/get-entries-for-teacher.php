<?php
require_once "connect.php";
require_once "login-fns.php";

$creds = json_decode($_POST["creds"]);
if(login_admin($conn, $creds->email, $creds->password) == false) {
	mysqli_close($conn);
	die(print_auth_error());
}

$query = "SELECT * FROM entries WHERE `byTeacherId` = '"
	. mysqli_real_escape_string($conn, $creds->teacherId) . "'";

$result = mysqli_query($conn, $query) or die("ahunm cheger");
$entries = [];

while($row = mysqli_fetch_assoc($result)) {
	array_push($entries, (object) [
		"entryId" => $row->entryId,
		"byTeacherId" => $row->teacherId,
		"studentCode" => $row->studentCode,
		"name" => $row->name,
		"grade" => $row->grade,
		"section" => $row->section,
		"schoolCode" => $row->schoolCode,
		"examCode" => $row->examCode,
		"marks" => json_decode($row->marks)
	]);
}

mysqli_close($conn);
die(print_data_success($entries));

?>
