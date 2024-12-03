import axios from 'axios';

// Busca todos os depósitos (admin side)
export const getDeposits = async () => {
    return await axios.get('/api/deposits');
};

// Busca os depósitos de um usuário específico
export const getUserDeposits = async (userId: number) => {
    return await axios.get(`/api/deposits/user/${userId}`);
};

// Cria um novo depósito
export const createDeposit = async (data: { user_id: number; valorDepositado: number }) => {
    return await axios.post('/api/deposits', data);
};

// Atualiza o status de um depósito (admin side)
export const updateDeposit = async (id: number, data: { status: string }) => {
    return await axios.put(`/api/deposits/${id}`, data);
};
