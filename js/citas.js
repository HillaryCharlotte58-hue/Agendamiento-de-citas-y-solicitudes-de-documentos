import { saveData, getData } from './storage.js';

let citas = getData('citas');

export function agendarCita(cita) {
    citas.push(cita);
    saveData('citas', citas);
}

export function obtenerCitasUsuario(cedula) {
    return citas.filter(c => c.cedula === cedula);
}