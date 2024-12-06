import config from '../../config';
import { APICore } from './apiCore';

const api = new APICore();

// Configurar token de autorização
export const setAuthorization = (token: string | null) => {
    if (token) {
        api.setAuthorization(token); // Define o token no cabeçalho
    } else {
        api.setAuthorization(null); // Remove o token do cabeçalho
    }
};

// Login
function login(params: { email: string; password: string }): any {
    const baseUrl = 'auth/login'; // Corrige a URL para incluir o prefixo '/api'
    return api
        .create(`${baseUrl}`, params);
}

// Logout
function logout(): any {
    const baseUrl = 'api/auth/logout'; // Corrige a URL para incluir o prefixo '/api'
    return api.create(`${baseUrl}`, {}).finally(() => {
        api.setLoggedInUser(null); // Remove o usuário do armazenamento local
        setAuthorization(null); // Remove o token do cabeçalho
    });
}

// Registro
function signup(params: { name: string; email: string; password: string }) {
    const baseUrl = 'auth/register'; // Corrige a URL para incluir o prefixo '/api'
    return api.create(`${config.API_URL}${baseUrl}`, params);
}

// Verificar senha atual
function verifyPassword(data: { currentPassword: string }) {
    const baseUrl = 'api/auth/verify-password';
    return api.create(baseUrl, data);
}

// Atualizar senha
function updatePassword(data: { newPassword: string }) {
    const baseUrl = 'api/auth/update-password';
    return api.update(baseUrl, data);
}

export { login, logout, signup, verifyPassword, updatePassword };
