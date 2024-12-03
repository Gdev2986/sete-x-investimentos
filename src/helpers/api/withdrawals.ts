import { APICore } from './apiCore';

const api = new APICore();

// Retiradas
function getWithdrawals() {
    const baseUrl = '/withdrawals';
    return api.get(baseUrl, {});
}

function createWithdrawal(data: { amount: number }) {
    const baseUrl = '/withdrawals';
    return api.create(baseUrl, data);
}

export { getWithdrawals, createWithdrawal };
