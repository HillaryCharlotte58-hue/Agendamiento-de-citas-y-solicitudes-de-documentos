import { saveData, getData } from './storage.js';

let usuarios = getData('usuarios');
let sesion = null;

export function initAuth() {
    const formLogin = document.getElementById('loginForm');

    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = formLogin.loginEmail.value.trim();
        const password = formLogin.loginPassword.value;

        const user = usuarios.find(u => u.email === email && u.password === password);

        if (!user) {
            alert('Credenciales incorrectas');
            return;
        }

        sesion = user;
        localStorage.setItem('sesion', JSON.stringify(user));

        mostrarDashboard(user);
    });
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