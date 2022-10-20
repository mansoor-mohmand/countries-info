<?php

header('Content-Type: application/json');

$test=json_decode(file_get_contents("php://input"));
//some code
// echo json_encode($test);

// $countryNames = json_decode($_POST['data']);

$myfile = fopen("country-names.json","w");
fwrite($myfile,$test);
fclose($myfile);
?>