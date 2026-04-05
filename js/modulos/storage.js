export function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

export function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

export function getSession() {
    return JSON.parse(localStorage.getItem('sesion'));
}

export function logout() {
    localStorage.removeItem('sesion');
}