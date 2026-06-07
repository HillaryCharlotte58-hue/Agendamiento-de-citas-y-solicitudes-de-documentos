<?php

header('Content-Type: application/json');

include("conexion.php");

$cedula = $_GET['cedula'];

$sql = "SELECT * FROM citas_nueva
        WHERE cedula_usuario='$cedula'
        ORDER BY fecha ASC";

$resultado = mysqli_query($conexion, $sql);

$citas = [];

while($fila = mysqli_fetch_assoc($resultado)){
    $citas[] = $fila;
}

echo json_encode($citas);