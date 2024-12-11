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
 * Busca as retiradas do usuário autenticado
 * @returns Uma lista de retiradas do usuário autenticado
 */
export const getUserWithdrawals = async (id: number): Promise<any[]> => {
    try {
        console.log(`Buscando retiradas para o usuário com ID: ${id}`);
        const response = await axios.get(`/withdrawals/user/${id}`); // Utiliza o ID passado
        console.log("Retiradas do usuário:", response.data);
        return response.data || [];
    } catch (error: any) {
        console.error("Erro ao buscar retiradas do usuário:", error.response?.data || error.message);
        throw error;
    }
};


/**
 * Busca todas as retiradas (apenas para administradores)
 * @returns Uma lista de retiradas
 */
export const getWithdrawals = async (): Promise<any[]> => {
    try {
        console.log("Buscando todas as retiradas (admin).");
        const response = await axios.get('/withdrawals');
        console.log("Retiradas encontradas:", response.data);
        return response.data || [];
    } catch (error: any) {
        console.error("Erro ao buscar retiradas:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Cria uma nova retirada para o usuário autenticado
 * @param data Os dados da retirada (valor, chave Pix, nome do titular)
 * @returns A retirada criada
 */
export const createWithdrawal = async (data: { amount: number; pix_key: string; name_account_withdrawal: string }): Promise<any> => {
    try {
        console.log("Criando retirada com os dados:", data);
        const response = await axios.post('/withdrawals', data); // `user_id` não é necessário
        console.log("Retirada criada com sucesso:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Erro ao criar retirada:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Atualiza o status de uma retirada (apenas para administradores)
 * @param id O ID da retirada a ser atualizada
 * @param data O novo status da retirada
 * @returns A retirada atualizada
 */
export const updateWithdrawal = async (id: number, data: { status: string }): Promise<any> => {
    try {
        console.log("Atualizando retirada com ID:", id, "para o status:", data.status);
        const response = await axios.put(`/withdrawals/${id}`, data);
        console.log("Retirada atualizada com sucesso:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Erro ao atualizar retirada:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Exclui uma retirada (apenas para administradores)
 * @param id O ID da retirada a ser excluída
 * @returns Uma mensagem de sucesso
 */
export const deleteWithdrawal = async (id: number): Promise<any> => {
    try {
        console.log("Excluindo retirada com ID:", id);
        const response = await axios.delete(`/withdrawals/${id}`);
        console.log("Retirada excluída com sucesso:", response.data);
        return response.data;
    } catch (error: any) {
        console.error("Erro ao excluir retirada:", error.response?.data || error.message);
        throw error;
    }
};
