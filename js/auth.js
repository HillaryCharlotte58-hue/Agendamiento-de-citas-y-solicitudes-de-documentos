import { saveData, getData } from './storage.js';

let usuarios = getData('usuarios');

export function registrar(usuario) {
    usuarios.push(usuario);
    saveData('usuarios', usuarios);
}

export function login(email, password) {
    return usuarios.find(u => u.email === email && u.password === password);
}