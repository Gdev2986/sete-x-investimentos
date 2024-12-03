import { APICore } from './apiCore';

const api = new APICore();

// Configurar token de autorização
const setAuthorization = (token: string | null) => {
    if (token) {
        api.setAuthorization(token);
    } else {
        api.setAuthorization(null);
    }
};

// Login
function login(params: { email: string; password: string }) {
    const baseUrl = '/auth/login';
    return api
        .create(`${baseUrl}`, params)
        .then((response) => {
            const user = response.data;
            api.setLoggedInUser(user); // Salva o usuário no armazenamento local
            setAuthorization(user.token);
            return user;
        });
}

// Logout
function logout() {
    const baseUrl = '/auth/logout';
    return api.create(`${baseUrl}`, {}).finally(() => {
        api.setLoggedInUser(null);
        setAuthorization(null);
    });
}

// Registro
function signup(params: { fullname: string; email: string; password: string }) {
    const baseUrl = '/auth/register';
    return api.create(`${baseUrl}`, params);
}

export { login, logout, signup };
