<?php

$host = "sql311.infinityfree.com";
$user = "if0_42181811";
$password = "8QnJjJtuQMGm";
$database = "if0_42181811_agendar_citas";

$conexion = mysqli_connect($host, $user, $password, $database);

if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}

?>s