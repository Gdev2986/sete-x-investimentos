import { APICore } from './apiCore';

const api = new APICore();

// Configurar token de autorização
const setAuthorization = (token: string | null) => {
    if (token) {
        api.setAuthorization(token); // Define o token no cabeçalho
    } else {
        api.setAuthorization(null); // Remove o token do cabeçalho
    }
};

// Login
function login(params: { email: string; password: string }) {
    const baseUrl = '/api/auth/login'; // Corrige a URL para incluir o prefixo '/api'
    return api
        .create(`${baseUrl}`, params)
        .then((response) => {
            const user = response.data; // Recebe os dados do usuário no login
            api.setLoggedInUser(user); // Salva o usuário no armazenamento local
            setAuthorization(user.token); // Define o token no cabeçalho de autorização
            return user;
        });
}

// Logout
function logout() {
    const baseUrl = '/api/auth/logout'; // Corrige a URL para incluir o prefixo '/api'
    return api.create(`${baseUrl}`, {}).finally(() => {
        api.setLoggedInUser(null); // Remove o usuário do armazenamento local
        setAuthorization(null); // Remove o token do cabeçalho
    });
}

// Registro
function signup(params: { name: string; email: string; password: string }) {
    const baseUrl = '/api/auth/register'; // Corrige a URL para incluir o prefixo '/api'
    return api.create(`${baseUrl}`, params);
}

// Verificar senha atual
function verifyPassword(data: { currentPassword: string }) {
    const baseUrl = '/api/auth/verify-password';
    return api.create(baseUrl, data);
}

// Atualizar senha
function updatePassword(data: { newPassword: string }) {
    const baseUrl = '/api/auth/update-password';
    return api.update(baseUrl, data);
}

export { login, logout, signup, verifyPassword, updatePassword };
