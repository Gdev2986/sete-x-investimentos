import { APICore } from './apiCore';

const api = new APICore();

// Obter todos os usuários (apenas para administradores)
function getUsers() {
    const baseUrl = '/users';
    return api.get(baseUrl, {});
}

// Obter um único usuário pelo ID
function getUserById(userId: number) {
    const baseUrl = `/users/${userId}`;
    return api.get(baseUrl, {});
}

// Criar um novo usuário (apenas para testes ou administradores)
function createUser(data: { name: string; email: string; password: string }) {
    const baseUrl = '/users';
    return api.create(baseUrl, data);
}

// Atualizar informações de um usuário
function updateUser(userId: number, data: { name?: string; email?: string; password?: string; role?: string }) {
    const baseUrl = `/users/${userId}`;
    return api.update(baseUrl, data);
}

// Excluir um usuário (apenas para administradores)
function deleteUser(userId: number) {
    const baseUrl = `/users/${userId}`;
    return api.delete(baseUrl);
}

function updateUserBalance(userId: number, data: { total_allocated?: number; balance?: number }) {
    const baseUrl = `/users/${userId}/balance`;
    return api.update(baseUrl, data);
}

export { getUsers, getUserById, createUser, updateUser, deleteUser ,updateUserBalance};
