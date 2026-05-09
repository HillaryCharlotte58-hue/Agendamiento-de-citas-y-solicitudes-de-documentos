import { saveData, getData } from './storage.js';

let citas = getData('citas');

export function initCitas() {
    console.log("Módulo de citas inicializado");
}

export function agendarCita(datos) {
    let citas = getData('citas');
    const nuevaCita = {
        id: Date.now(),
        ...datos,
        estado: 'agendada'
    };
    citas.push(nuevaCita);
    saveData('citas', citas);
    return nuevaCita;
}

export function reprogramarCita(id, nuevaFecha, nuevoMedico) {
    let citas = getData('citas');
    const index = citas.findIndex(c => c.id === id);
    if (index !== -1) {
        citas[index].fecha = nuevaFecha;
        if (nuevoMedico) citas[index].medico = nuevoMedico;
        citas[index].estado = 'reprogramada';
        saveData('citas', citas);
        return true;
    }
    return false;
}

export function cancelarCita(id) {
    let citas = getData('citas');
    const index = citas.findIndex(c => c.id === id);
    if (index !== -1) {
        citas.splice(index, 1);
        saveData('citas', citas);
        return true;
    }
    return false;
}