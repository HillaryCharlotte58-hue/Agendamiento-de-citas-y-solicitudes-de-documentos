<?php

$host = "localhost";
$user = "root";
$password = "";
$database = "Agendar_Citas";


$conexion = mysqli_connect("localhost", "root", "", "agendar_citas");

if(!$conexion){
    die("Error de conexión: " . mysqli_connect_error());
}
?>