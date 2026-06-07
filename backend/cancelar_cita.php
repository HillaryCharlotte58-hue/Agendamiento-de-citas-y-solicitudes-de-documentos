<?php

header('Content-Type: application/json');

include("conexion.php");

$id = $_POST['id'];

$sql = "UPDATE citas_nueva
SET estado='Cancelada'
WHERE id='$id'";

if(mysqli_query($conexion,$sql)){

    echo json_encode([
        "success"=>true
    ]);

}else{

    echo json_encode([
        "success"=>false,
        "error"=>mysqli_error($conexion)
    ]);

}

?>