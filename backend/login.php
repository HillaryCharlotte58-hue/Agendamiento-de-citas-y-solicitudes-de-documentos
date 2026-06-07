<?php

include("conexion.php");

$correo = $_POST['correo'];
$password = $_POST['password'];

$sql = "SELECT * FROM usuarios WHERE correo='$correo'";

$resultado = mysqli_query($conexion, $sql);

if(mysqli_num_rows($resultado) > 0){

    $usuario = mysqli_fetch_assoc($resultado);

    if(password_verify($password, $usuario['password'])){

        echo json_encode([
            "success" => true,
            "usuario" => [
                "id" => $usuario["id"],
                "nombre" => $usuario["nombre"],
                "cedula" => $usuario["cedula"],
                "correo" => $usuario["correo"],
                "rol" => $usuario["rol"]
            ]
        ]);

    }else{

        echo json_encode([
            "success" => false,
            "message" => "Contraseña incorrecta"
        ]);

    }

}else{

    echo json_encode([
        "success" => false,
        "message" => "Usuario no encontrado"
    ]);

}
?>