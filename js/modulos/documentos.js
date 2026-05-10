import { saveData, getData } from './storage.js';

export function solicitarDocumento(datos) {
    let solicitudes = getData('solicitudes');
    
    const nuevaSolicitud = {
        id: Date.now(),
        ...datos,
        estado: 'pendiente',
        fechaSolicitud: new Date().toISOString()
    };

    solicitudes.push(nuevaSolicitud);
    saveData('solicitudes', solicitudes);
    
    return { success: true, solicitud: nuevaSolicitud };
}

export function obtenerSolicitudesUsuario(cedula) {
    const solicitudes = getData('solicitudes');
    return solicitudes.filter(s => s.cedula === cedula);
}

export function actualizarEstadoSolicitud(id, nuevoEstado) {
    let solicitudes = getData('solicitudes');
    const index = solicitudes.findIndex(s => s.id === id);
    
    if (index !== -1) {
        solicitudes[index].estado = nuevoEstado;
        saveData('solicitudes', solicitudes);
        return true;
    }
    return false;
}
