<?php
require_once "connect.php";
require_once "login-fns.php";

$creds = json_decode($_POST["creds"]);
$student = login_student($conn, $creds->studentCode, $creds->password);

if(!$student) {
	mysqli_close($conn);
	die(print_auth_error());
}

$query = "SELECT * FROM entries WHERE "
	. "`studentCode` = '" . mysqli_real_escape_string($conn, $creds->studentCode) . "'";
$result = mysqli_query($conn, $query);
$entries = [];

while($row = mysqli_fetch_assoc($result)) {
	$row = (object) $row;
	array_push($entries, (object)[
		"entryId" => $row->entryId,
		"byTeacherId" => $row->byTeacherId,
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

$response_result = array(
	"entries" => $entries,
	"student" => $student
);
die(print_data_success($response_result));

?>
