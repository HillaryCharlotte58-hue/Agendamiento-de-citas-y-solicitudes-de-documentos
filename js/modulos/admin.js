import { saveData, getData } from './storage.js';

export function obtenerTodosLosUsuarios() {
    return getData('usuarios');
}

export function obtenerTodasLasCitas() {
    return getData('citas');
}

export function obtenerTodasLasSolicitudes() {
    return getData('solicitudes');
}

export function eliminarUsuario(cedula) {
    let usuarios = getData('usuarios');
    const index = usuarios.findIndex(u => u.cedula === cedula);
    if (index !== -1) {
        usuarios.splice(index, 1);
        saveData('usuarios', usuarios);
        return true;
    }
    return false;
}

export function cambiarRolUsuario(cedula, nuevoRol) {
    let usuarios = getData('usuarios');
    const index = usuarios.findIndex(u => u.cedula === cedula);
    if (index !== -1) {
        usuarios[index].rol = nuevoRol;
        saveData('usuarios', usuarios);
        return true;
    }
    return false;
}

export function verificarPermisos(usuario, rolesPermitidos) {
    if (!usuario) return false;
    return rolesPermitidos.includes(usuario.rol);
}