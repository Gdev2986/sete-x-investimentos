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



// Atualizar informações de um usuário
function updateUser(userId: number, data: { username?: string; email?: string; password?: string; role?: string }) {
    const baseUrl = `/users/${userId}`;
    return api.update(baseUrl, data);
}

function updateUserRole(userId: number, role: string) {
    const baseUrl = `/users/${userId}/role`;
    console.log(`Chamando API para atualizar permissão de userId ${userId} para ${role}`);
    return api.patch(baseUrl, { role }); 
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

export { getUsers, getUserById, updateUser, deleteUser ,updateUserBalance, updateUserRole};
