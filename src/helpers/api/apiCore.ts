import jwtDecode from 'jwt-decode';
import axios from 'axios';

import config from '../../config';

// Configurações globais do axios
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Content-Length'] = '';
axios.defaults.headers.post['Accept'] = '*/*';
axios.defaults.baseURL = config.API_URL;

// Interceptação de erros para capturar e gerenciar respostas
axios.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error?.response)
        let message;
        if (error?.response?.status === 404) {
            // Redirecionamento para página não encontrada (desabilitado)
        } else if (error?.response?.status === 403) {
            window.location.href = '/access-denied';
        } else {
            switch (error.response?.status) {
                case 401:
                    message = 'Credenciais inválidas';
                    break;
                case 403:
                    message = 'Acesso proibido';
                    break;
                case 404:
                    message = 'Desculpe, os dados procurados não foram encontrados';
                    break;
                default:
                    message =
                        error.response?.data?.message || error.message || 'Erro desconhecido';
            }
            return Promise.reject(message);
        }
    }
);

const AUTH_SESSION_KEY = 'setex_user';

class APICore {
    /**
     * Define o token de autorização no cabeçalho
     */
    setAuthorization = (token: string | null) => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    };

    /**
     * Retorna o usuário autenticado da sessão
     */
    getLoggedInUser = () => {
        const user = sessionStorage.getItem(AUTH_SESSION_KEY);
        return user ? JSON.parse(user) : null;
    };

    /**
     * Define o usuário autenticado na sessão
     */
    setLoggedInUser = (session: any) => {
        if (session) {
            sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
        } else {
            sessionStorage.removeItem(AUTH_SESSION_KEY);
        }
    };

    /**
     * Verifica se o usuário está autenticado
     */
    isUserAuthenticated = () => {
        const user = this.getLoggedInUser();
        if (!user) return false;

        const decoded: any = jwtDecode(user.token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    };

    // Métodos de requisição
    get = (url: string, params: any) => {
        if (params) {
            const queryString = Object.keys(params)
                .map((key) => `${key}=${params[key]}`)
                .join('&');
            return axios.get(`${url}?${queryString}`);
        }
        return axios.get(url);
    };

    create = (url: string, data: any) => axios.post(url, data);

    update = (url: string, data: any) => axios.put(url, data);

    delete = (url: string) => axios.delete(url);

    createWithFile = (url: string, data: any) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        return axios.post(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    };

    updateWithFile = (url: string, data: any) => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        return axios.patch(url, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    };
}

// Inicialização do token de autorização na carga do arquivo
const user = sessionStorage.getItem(AUTH_SESSION_KEY);
if (user) {
    const { token } = JSON.parse(user);
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
}

export { APICore };
