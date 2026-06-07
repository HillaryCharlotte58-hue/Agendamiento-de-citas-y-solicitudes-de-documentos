<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

include("conexion.php");

$cedula = $_POST['cedula'] ?? null;
$nombre = $_POST['nombre'] ?? null;
$especialidad = $_POST['especialidad'] ?? null;
$fecha = $_POST['fecha'] ?? null;
$hora = $_POST['hora'] ?? null;

if(!$cedula || !$nombre || !$especialidad || !$fecha || !$hora){
    echo json_encode([
        "success" => false,
        "error" => "Faltan datos en POST"
    ]);
    exit;
}

$sql = "INSERT INTO citas_nueva
(cedula_usuario, nombre_usuario, especialidad, fecha, hora)
VALUES
('$cedula', '$nombre', '$especialidad', '$fecha', '$hora')";

if(mysqli_query($conexion, $sql)){
    echo json_encode(["success" => true]);
}else{
    echo json_encode([
        "success" => false,
        "error" => mysqli_error($conexion)
    ]);
}
?>