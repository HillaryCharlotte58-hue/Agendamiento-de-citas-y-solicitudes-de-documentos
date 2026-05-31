<?php

$host = "localhost";
$user = "root";
$password = "";
$database = "Agendar_Citas";

$conexion = mysqli_connect(
    $host,
    $user,
    $password,
    $database
);

if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}

?>