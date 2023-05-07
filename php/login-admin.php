<?php
require_once "connect.php";
require_once "login-fns.php";

$creds = json_decode($_POST["creds"]);
$teacher = login_admin($conn, $creds->email, $creds->password);

if(!$teacher) {
	mysqli_close($conn);
	die(print_auth_error());
}

mysqli_close($conn);
die(print_data_success($teacher));

?>
