<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Authorization, Origin');
header('Access-Control-Allow-Methods:  POST, PUT, GET');

$conn = mysqli_connect("localhost", "id20608832_reportreport", "]R<LjdzT*q=A<0Lp", "id20608832_resultreport");

if(!$conn) {
	die("Cheger: Coundnt connect");
}

?>
