import { saveData, getData } from './storage.js';

let citas = getData('citas');

export function initCitas() {
    console.log("Módulo de citas inicializado");
}

export function agendarCita(cedula, datos) {
    let citas = getData('citas');
    const nuevaCita = {
        id: Date.now(),
        cedula: cedula,
        fecha: datos.fecha,
        hora: datos.hora,
        medico: datos.medico,
        especialidad: datos.especialidad,
        estado: 'agendada',
        fechaCreacion: new Date().toISOString()
    };
    citas.push(nuevaCita);
    saveData('citas', citas);
    return { success: true, cita: nuevaCita };
}

export function reprogramarCita(cedula, indexUsuario, datosNuevos) {
    let citas = getData('citas');
    // Filtrar citas del usuario para encontrar la correcta por el índice de la UI
    const citasUsuario = citas.filter(c => c.cedula === cedula);
    const citaAEditar = citasUsuario[indexUsuario];
    
    if (!citaAEditar) return { success: false, message: 'Cita no encontrada' };

    const indexGlobal = citas.findIndex(c => c.id === citaAEditar.id);
    if (indexGlobal !== -1) {
        citas[indexGlobal].fecha = datosNuevos.fecha;
        if (datosNuevos.medico) citas[indexGlobal].medico = datosNuevos.medico;
        citas[indexGlobal].estado = 'reprogramada';
        saveData('citas', citas);
        return { success: true };
    }
    return { success: false, message: 'Error al actualizar' };
}

export function cancelarCita(cedula, indexUsuario) {
    let citas = getData('citas');
    const citasUsuario = citas.filter(c => c.cedula === cedula);
    const citaAEliminar = citasUsuario[indexUsuario];

    if (!citaAEliminar) return { success: false, message: 'Cita no encontrada' };

    const indexGlobal = citas.findIndex(c => c.id === citaAEliminar.id);
    if (indexGlobal !== -1) {
        citas.splice(indexGlobal, 1);
        saveData('citas', citas);
        return { success: true };
    }
    return { success: false, message: 'Error al eliminar' };
}

export function obtenerCitasUsuario(cedula) {
    const citas = getData('citas');
    return citas.filter(c => c.cedula === cedula);
}