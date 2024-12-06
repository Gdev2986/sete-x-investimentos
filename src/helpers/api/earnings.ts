import { APICore } from './apiCore';

const api = new APICore();

// Obtém todos os rendimentos (apenas administradores)
function getEarnings() {
    const baseUrl = '/earnings';
    return api.get(baseUrl, {});
}

// Obtém os rendimentos de um usuário específico
function getUserEarnings(userId: number) {
    const baseUrl = `/earnings/user/${userId}`;
    return api.get(baseUrl, {});
}

// Cria um novo rendimento
function createEarning(data: { amount: number }) {
    const baseUrl = '/earnings';
    return api.create(baseUrl, data);
}

// Atualiza um rendimento existente (apenas administradores)
function updateEarning(earningId: number, data: { amount?: number }) {
    const baseUrl = `/earnings/${earningId}`;
    return api.update(baseUrl, data);
}

// Exclui um rendimento (apenas administradores)
function deleteEarning(earningId: number) {
    const baseUrl = `/earnings/${earningId}`;
    return api.delete(baseUrl);
}

export { getEarnings, getUserEarnings, createEarning, updateEarning, deleteEarning };
