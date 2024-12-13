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
    const baseUrl = 'auth/logout'; // Corrige a URL para incluir o prefixo '/api'
    return api.create(`${baseUrl}`, {}).finally(() => {
        api.setLoggedInUser(null); // Remove o usuário do armazenamento local
        setAuthorization(null); // Remove o token do cabeçalho
    });
}


function signup(params: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    contact: string;
    password: string;
}) {
    const baseUrl = 'auth/register';
    
    // Transformando os campos
    const mappedParams = {
        first_name: params.firstName,
        last_name: params.lastName,
        username: params.username,
        email: params.email,
        contact: params.contact.replace(/\D/g, ''), // Remove caracteres não numéricos do contato
        password: params.password,
    };

    console.log('[Signup Function] Dados enviados ao backend:', mappedParams); // Log para depuração

    // Fazendo a requisição ao backend
    return api.create(`${config.API_URL}/${baseUrl}`, mappedParams);
}


  

// Verificar senha atual
function verifyPassword(data: { currentPassword: string }) {
    const baseUrl = 'auth/verify-password';
    return api.create(baseUrl, data);
}

// Atualizar senha
function updatePassword(data: { newPassword: string }) {
    const baseUrl = 'auth/update-password';
    return api.update(baseUrl, data);
}

export { login, logout, signup, verifyPassword, updatePassword };
