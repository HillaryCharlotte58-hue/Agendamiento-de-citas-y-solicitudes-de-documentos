<?php

ini_set("display_errors", 1);
error_reporting(E_ALL);

include("conexion.php");

$nombre = $_POST['nombre'];
$cedula = $_POST['cedula'];
$correo = $_POST['correo'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

$sql = "INSERT INTO usuarios
(nombre, cedula, correo, password, rol)
VALUES
('$nombre', '$cedula', '$correo', '$password', 'usuario')";

if(mysqli_query($conexion, $sql)){

    echo json_encode([
        "success" => true
    ]);

}else{

    echo json_encode([
        "success" => false,
        "error" => mysqli_error($conexion)
    ]);

}
?>