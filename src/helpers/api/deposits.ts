import axios from 'axios';
import { APICore } from './apiCore';

const api = new APICore();

/**
 * Função para obter o ID do usuário autenticado
 * @returns O ID do usuário autenticado ou `null` se não estiver logado
 */
function getUserId(): number | null {
    const loggedInUser = api.getLoggedInUser(); // Obtém o usuário autenticado da sessão
    if (!loggedInUser || !loggedInUser.user) {
        console.warn("Usuário não está logado ou sessão não disponível.");
        return null;
    }
    console.log("Usuário autenticado encontrado:", loggedInUser);
    return loggedInUser.user.id; // Corrigido para acessar o ID do usuário dentro de `user`
}

/**
 * Busca os depósitos do usuário autenticado
 * @returns Uma lista de depósitos do usuário autenticado
 */
export const getUserDeposits = async () => {
    try {
        const userId = getUserId();
        if (!userId) {
            console.error("Erro: Usuário não autenticado.");
            throw new Error("Usuário não autenticado.");
        }
        console.log("Buscando depósitos para o usuário com ID:", userId);

        const response = await axios.get(`/deposits/user/${userId}`);
        console.log("Resposta completa da API:", response);

        // Retorna os dados ou fallback para um array vazio
        return response.data || [];
    } catch (error) {
        console.error("Erro ao buscar depósitos do usuário:", error);
        throw error;
    }
};

/**
 * Busca todos os depósitos (apenas para administradores)
 * @returns Uma lista de depósitos
 */
export const getDeposits = async () => {
    try {
        console.log("Buscando todos os depósitos (admin).");
        const response = await axios.get('/deposits');
        console.log("Depósitos encontrados:", response.data);

        // Retorna os dados ou fallback para um array vazio
        return response.data || [];
    } catch (error) {
        console.error("Erro ao buscar depósitos:", error);
        throw error;
    }
};

/**
 * Cria um novo depósito para o usuário autenticado
 * @param data Os dados do depósito (valor do depósito)
 * @returns O depósito criado
 */
export const createDeposit = async (data: { amount: number }) => {
    const userId = getUserId();
    if (!userId) {
        console.error("Erro: Usuário não autenticado.");
        throw new Error("Usuário não autenticado.");
    }

    try {
        console.log("Criando depósito para o usuário com ID:", userId, "com os dados:", data);
        const response = await axios.post('/deposits', { ...data, user_id: userId }); // Envia o campo "amount"
        console.log("Depósito criado com sucesso:", response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar depósito:", error);
        throw error;
    }
};


/**
 * Atualiza o status de um depósito (apenas para administradores)
 * @param id O ID do depósito a ser atualizado
 * @param data O novo status do depósito
 * @returns O depósito atualizado
 */
export const updateDeposit = async (id: number, data: { status: string }) => {
    try {
        console.log("Atualizando depósito com ID:", id, "para o status:", data.status);
        const response = await axios.put(`/deposits/${id}`, data);
        console.log("Depósito atualizado com sucesso:", response.data);
        return response.data;
    } catch (error) {
        console.error("Erro ao atualizar depósito:", error);
        throw error;
    }
};
