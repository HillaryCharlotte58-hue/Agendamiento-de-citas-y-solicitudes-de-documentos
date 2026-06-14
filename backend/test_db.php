<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

include("conexion.php");

echo "<pre>";

if (isset($conexion) && $conexion) {
    echo "CONEXION EXITOSA";
} else {
    echo "FALLO LA CONEXION";
}

echo "</pre>";

?>