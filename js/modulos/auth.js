import { saveData, getData } from './storage.js';

let usuarios = getData('usuarios');
let sesion = null;

export function login(email, password) {
    const usuarios = getData('usuarios');
    const user = usuarios.find(u => u.email === email.toLowerCase() && u.password === password);

    if (!user) return { success: false, message: 'Usuario o contraseña incorrectos' };

    localStorage.setItem('sesion', JSON.stringify(user));
    return { success: true, user };
}

export function registrar(datos) {
    let usuarios = getData('usuarios');

    if (usuarios.some(u => u.email === datos.email.toLowerCase())) {
        return { success: false, message: 'El correo ya está registrado' };
    }
    if (usuarios.some(u => u.cedula === datos.cedula)) {
        return { success: false, message: 'El documento ya está registrado' };
    }

    const nuevoUsuario = {
        ...datos,
        email: datos.email.toLowerCase(),
        rol: datos.rol || 'paciente'
    };

    usuarios.push(nuevoUsuario);
    saveData('usuarios', usuarios);
    return { success: true, user: nuevoUsuario };
}

export function obtenerSesion() {
    return JSON.parse(localStorage.getItem('sesion'));
}

export function cerrarSesion() {
    localStorage.removeItem('sesion');
    if (window.location.reload) window.location.reload();
}

function mostrarDashboard(user) {
    document.getElementById('inicio').innerHTML = `
        <h2>Bienvenido ${user.nombre}</h2>
        <div class="dashboard">
            <button onclick="ir('gestionCitas')">Citas</button>
            <button onclick="ir('solicitudDocumentos')">Documentos</button>
            ${user.rol === 'administrador' ? '<button onclick="ir(\'administracion\')">Admin</button>' : ''}
        </div>
    `;
}

window.ir = function(seccion){
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.getElementById(seccion).classList.add('active');
}