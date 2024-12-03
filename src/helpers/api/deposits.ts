import axios from 'axios';

// Busca todos os depósitos
export const getDeposits = async () => {
    return await axios.get('/api/deposits');
};

// Atualiza o status de um depósito
export const updateDeposit = async (id: number, data: { status: string }) => {
    return await axios.put(`/api/deposits/${id}`, data);
};
