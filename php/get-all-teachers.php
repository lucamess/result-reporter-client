<?php
require_once "connect.php";
require_once "login-fns.php";

$creds = json_decode($_POST["creds"]);
if(login_admin($conn, $creds->email, $creds->password) == false) {
	mysqli_close($conn);
	die(print_auth_error());
}

$query = "SELECT * FROM teachers";
$result = mysqli_query($conn, $query) or die("cheger again abo");
$teachers = [];

while($row = mysqli_fetch_assoc($result)) {
	$row = (object) $row;
	array_push($teachers, (object) [
		"teacherId" => $row->teacherId,
		"name" => $row->name,
		"email" => $row->email,
		"password" => $row->password,
		"schoolCode" => $row->schoolCode,
		"type" => $row->type,
		"subjectsAllowed" => json_decode($row->subjectsAllowed)
	]);
}

mysqli_close($conn);
die(print_data_success($teachers));

?>
