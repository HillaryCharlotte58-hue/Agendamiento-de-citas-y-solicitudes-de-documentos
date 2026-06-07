
<?php

header('Content-Type: application/json');

include("conexion.php");

echo json_encode($_POST);
exit;

$id = $_POST['id'];
$fecha = $_POST['fecha'];
$hora = $_POST['hora'];


$sql = "UPDATE citas_nueva
SET
fecha='$fecha',
hora='$hora',
estado='Reprogramada'
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