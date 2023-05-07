<?php
require_once "connect.php";
require_once "login-fns.php";

$creds = json_decode($_POST["creds"]);
$data = json_decode($_POST["q"]);

if(login_admin($conn, $creds->email, $creds->password) == false) {
	mysqli_close($conn);
	die(print_auth_error());
}

$query = "DELETE FROM teachers";
mysqli_query($conn, $query);

foreach($data as $teacher) {
	$subjectsAllowed = json_encode($teacher->subjectsAllowed);
	$query = "INSERT INTO teachers"
		. "(`teacherId`, `name`, `email`, `password`, `schoolCode`, `type`, `subjectsAllowed`)"
		. " VALUES ("
		. "'" . mysqli_real_escape_string($conn, $teacher->teacherId) . "', "
		. "'" . mysqli_real_escape_string($conn, $teacher->name) . "', "
		. "'" . mysqli_real_escape_string($conn, $teacher->email) . "', "
		. "'" . mysqli_real_escape_string($conn, $teacher->password) . "', "
		. "'" . mysqli_real_escape_string($conn, $teacher->schoolCode) . "', "
		. "'" . mysqli_real_escape_string($conn, $teacher->type) . "', "
		. "'" . mysqli_real_escape_string($conn, $subjectsAllowed) . "')";

	mysqli_query($conn, $query);
}


mysqli_close($conn);
die(print_op_success());

?>
