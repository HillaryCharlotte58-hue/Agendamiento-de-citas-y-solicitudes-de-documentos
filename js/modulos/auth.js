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

export async function registrar(datos) {

    const formData = new FormData();

    formData.append("nombre", datos.nombre);
    formData.append("cedula", datos.cedula);
    formData.append("correo", datos.email);
    formData.append("password", datos.password);

    const respuesta = await fetch(
        "backend/registrar.php",
        {
            method: "POST",
            body: formData
        }
    );

    const resultado = await respuesta.json();

    return resultado;
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