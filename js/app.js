// Variables y estado global
let usuarios = [];
let sesionesUsuario = null;
let citas = [];
let solicitudes = [];

// Selecciones DOM
const navLinks = document.querySelectorAll('nav .nav-link');
const sections = document.querySelectorAll('main > section');
const btnLoginNav = document.querySelector('nav button[data-target="auth"]');

// Cambiar sección activa y menú
function cambiarSeccion(seccionId) {
  sections.forEach(s => s.classList.toggle('active', s.id === seccionId));
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('data-target') === seccionId));
  btnLoginNav.disabled = (seccionId === 'auth');
}

// Navegación principal
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    cambiarSeccion(link.getAttribute('data-target'));
  });
});

// Mostrar inicio al cargar página
cambiarSeccion('inicio');

// Formulario Login
const formLogin = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const loginSuccess = document.getElementById('loginSuccess');
const btnIngresarLogin = formLogin.querySelector('button');

// Validar inputs login
function validarLoginInputs() {
  const documento = formLogin.loginDocumento.value.trim();
  const pass = formLogin.loginPassword.value;
  btnIngresarLogin.disabled = !(documento.length > 0 && pass.length >= 6);
}
formLogin.loginDocumento.addEventListener('input', validarLoginInputs);
formLogin.loginPassword.addEventListener('input', validarLoginInputs);
validarLoginInputs(); // Inicializar botón deshabilitado

// Manejar submit login
formLogin.addEventListener('submit', e => {
  e.preventDefault();
  loginError.style.display = 'none';
  loginSuccess.style.display = 'none';

  const documento = formLogin.loginDocumento.value.trim();
  const pass = formLogin.loginPassword.value;
  const usuario = usuarios.find(u => u.cedula === documento);

  if (!usuario) {
    loginError.textContent = 'Usuario no registrado.';
    loginError.style.display = 'block';
    return;
  }
  if (usuario.password !== pass) {
    loginError.textContent = 'Contraseña incorrecta.';
    loginError.style.display = 'block';
    return;
  }

  sesionesUsuario = usuario;
  loginSuccess.textContent = `Bienvenido ${usuario.nombre}`;
  loginSuccess.style.display = 'block';
  formLogin.reset();
  btnIngresarLogin.disabled = true;

  // Mostrar inicio automáticamente
  cambiarSeccion('inicio');

  // Abrir ventana emergente con opciones rápidas de gestión
  const ventanaOpciones = window.open('', 'OpcionesGestion', 'width=400,height=400');
  if (ventanaOpciones) {
    ventanaOpciones.document.write(`
      <html lang="es"><head><title>Opciones de Gestión</title><style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #f9fbfd; color: #0a3a71; }
        h2 { margin-bottom: 20px; }
        button { background: #064075; color: white; border: none; padding: 15px; margin: 10px 0; border-radius: 6px; cursor: pointer; font-size: 1.1rem; width: 100%; }
        button:hover { background: #042f5a; }
      </style></head><body>
        <h2>Opciones de Gestión</h2>
        <button onclick="window.opener.cambiarSeccion('gestionCitas'); window.close();">Gestionar Cita</button>
        <button onclick="window.opener.cambiarSeccion('reprogramarContainer'); window.close();">Reprogramar Cita</button>
        <button onclick="window.opener.cambiarSeccion('cancelarContainer'); window.close();">Cancelar Cita</button>
        <button onclick="window.opener.cambiarSeccion('solicitudDocumentos'); window.close();">Solicitar Documentos</button>
      </body></html>`);
    ventanaOpciones.document.close();
  } else {
    alert('Por favor permita ventanas emergentes para acceder a opciones rápidas.');
  }
});

// -- Aquí integrarías las otras funciones que ya tienes para registro, gestión de citas, solicitudes, administración --

// Actualizar reportes e informes
function actualizarInformes() {
  document.getElementById('totalCitas').textContent = citas.length;
  document.getElementById('totalSolicitudes').textContent = solicitudes.length;
  document.getElementById('totalUsuarios').textContent = usuarios.length;
  document.getElementById('totalEspecialidades').textContent = 'N/A'; // Ajusta si tienes conteo
}

// Actualizar tabla usuarios
function actualizarTablaUsuarios() {
  const tbody = document.querySelector('#tablaUsuarios tbody');
  tbody.innerHTML = '';
  usuarios.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${u.cedula}</td><td>${u.nombre}</td><td>${u.rol}</td>`;
    tbody.appendChild(tr);
  });
}

// Inicialización
actualizarInformes();
actualizarTablaUsuarios();

  // Abrir ventana emergente con opciones
   const ventanaOpciones = window.open('', 'OpcionesGestion', 'width=600,height=600');
  if (ventanaOpciones) {
    ventanaOpciones.document.write(`
      <html lang="es"><head><title>Opciones de Gestión</title><style>
        body { font-family: Arial, sans-serif; padding: 20px; background: #f9fbfd; color: #0a3a71; }
        button { background: #064075; color: white; border: none; padding: 15px; margin: 10px 0; border-radius: 6px; cursor: pointer; font-size: 1.1rem; width: 100%; }
        button:hover { background: #042f5a; }
        h2 { margin-bottom: 20px; }
        </style></head><body>
        <h2>Opciones de Gestión</h2>
        <button onclick="window.opener.mostrarGestion('agendarContainer'); window.close();">Gestionar Cita</button>
        <button onclick="window.opener.mostrarGestion('reprogramarContainer'); window.close();">Reprogramar Cita</button>
        <button onclick="window.opener.mostrarGestion('cancelarContainer'); window.close();">Cancelar Cita</button>
        <button onclick="window.opener.cambiarSeccion('solicitudDocumentos'); window.close();">Solicitar Documentos</button>
      </body></html>`);
    ventanaOpciones.document.close();
  } else {
    alert('Bloqueador de ventanas impide abrir opciones de gestión. Por favor, permita ventanas emergentes.');
  }
// Función para mostrar sección de gestión específica

function mostrarGestion(contenedorId) {
  cambiarSeccion('gestionCitas');
  document.getElementById('agendarContainer').style.display = 'none';
  document.getElementById('reprogramarContainer').style.display = 'none';
  document.getElementById('cancelarContainer').style.display = 'none';
  document.getElementById(contenedorId).style.display = 'block';
}

  actualizarInformes();
  actualizarTablaUsuarios();


// Funciones para actualizar reportes y tabla de usuarios
function actualizarInformes() {
  document.getElementById('totalCitas').textContent = citas.length;
  document.getElementById('totalSolicitudes').textContent = solicitudes.length;
  document.getElementById('totalUsuarios').textContent = usuarios.length;
  document.getElementById('totalEspecialidades').textContent = 'N/A';
}

function actualizarTablaUsuarios() {
  const tbody = document.querySelector('#tablaUsuarios tbody');
  tbody.innerHTML = '';
  usuarios.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${u.cedula}</td><td>${u.nombre}</td><td>${u.rol}</td>`;
    tbody.appendChild(tr);
  });
}

// Inicialización al cargar documento
document.addEventListener('DOMContentLoaded', () => {
  cambiarSeccion('inicio');
  actualizarInformes();
  actualizarTablaUsuarios();
});