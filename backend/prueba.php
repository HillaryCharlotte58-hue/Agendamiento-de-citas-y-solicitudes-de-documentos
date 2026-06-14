<?php
// Primero: Definir credenciales de conexión
$servername = "localhost";
$username = "root";
$password = "";
$database = "tu_base_datos";

// Segundo: Crear la conexión
$conexion = new mysqli($servername, $username, $password, $database);

// Tercero: Verificar la conexión
if ($conexion->connect_error) {
    echo "ERROR DE CONEXION: " . $conexion->connect_error;
} else {
    echo "CONEXION EXITOSA";
}
?>