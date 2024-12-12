import axios from 'axios';
import { APICore } from './apiCore';

const api = new APICore();

/**
 * Função para obter o ID do usuário autenticado
 * @returns O ID do usuário autenticado ou `null` se não estiver logado
 */
function getUserId(): number | null {
    const loggedInUser = api.getLoggedInUser();
    if (!loggedInUser || !loggedInUser.user) {
        console.warn("Usuário não está logado ou sessão não disponível.");
        return null;
    }
    console.log("Usuário autenticado encontrado:", loggedInUser);
    return loggedInUser.user.id;
}

/**
 * Busca as retiradas do usuário autenticado
 * @returns Uma lista de retiradas do usuário autenticado
 */
export const getUserWithdrawals = async (): Promise<any[]> => {
    try {
        const userId = getUserId(); // Obtém o ID do usuário autenticado
        if (!userId) {
            console.error("Erro: Usuário não autenticado.");
            throw new Error("Usuário não autenticado.");
        }
        console.log("Buscando retiradas para o usuário com ID:", userId);

        const response = await axios.get(`/withdrawals/user/${userId}`); // Inclui o ID do usuário na rota
        console.log("Resposta completa da API:", response);

        // Retorna os dados ou fallback para um array vazio
        return response.data || [];
    } catch (error) {
        console.error("Erro ao buscar retiradas do usuário:", error);
        throw error;
    }
};

/**
 * Cria uma nova retirada para o usuário autenticado
 * @param data Dados da retirada
 * @returns A retirada criada
 */
export const createWithdrawal = async (data: { amount: number; pix_key: string; name_account_withdrawal: string }): Promise<any> => {
    try {
        const response = await axios.post('/withdrawals', data);
        return response.data;
    } catch (error: any) {
        console.error("Erro ao criar retirada:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Atualiza o status de uma retirada (apenas para administradores)
 * @param id O ID da retirada
 * @param data O novo status
 * @returns A retirada atualizada
 */
export const updateWithdrawal = async (id: number, data: { status: string }): Promise<any> => {
    try {
        const response = await axios.put(`/withdrawals/${id}`, data);
        return response.data;
    } catch (error: any) {
        console.error("Erro ao atualizar retirada:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Exclui uma retirada (apenas para administradores)
 * @param id O ID da retirada
 * @returns Uma mensagem de sucesso
 */
export const deleteWithdrawal = async (id: number): Promise<any> => {
    try {
        const response = await axios.delete(`/withdrawals/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("Erro ao excluir retirada:", error.response?.data || error.message);
        throw error;
    }
};
