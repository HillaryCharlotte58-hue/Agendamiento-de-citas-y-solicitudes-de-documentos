import { saveData, getData } from './storage.js';

let citas = getData('citas');

export function initCitas() {
    const btn = document.getElementById('btnAgendar');

    btn.addEventListener('click', () => {
        const fecha = document.getElementById('fechaAgendar').value;
        const medico = document.getElementById('medicoAgendar').value;

        if (!fecha || !medico) {
            alert('Complete los datos');
            return;
        }

        const nueva = {
            id: Date.now(),
            fecha,
            medico
        };

        citas.push(nueva);
        saveData('citas', citas);

        alert('Cita guardada');
    });
}