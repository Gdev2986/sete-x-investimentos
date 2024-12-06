import { APICore } from './apiCore';

const api = new APICore();

// Retiradas
function getWithdrawals() {
    const baseUrl = '/api/withdrawals';
    return api.get(baseUrl, {});
}

function getUserWithdrawals(userId: number) {
    const baseUrl = `/api/withdrawals/user/${userId}`;
    return api.get(baseUrl, {});
}

function createWithdrawal(data: { amount: number; method: string }) {
    const baseUrl = '/api/withdrawals';
    return api.create(baseUrl, data);
}

function updateWithdrawal(id: number, data: { status: string }) {
    const baseUrl = `/api/withdrawals/${id}`;
    return api.update(baseUrl, data);
}

function deleteWithdrawal(id: number) {
    const baseUrl = `/api/withdrawals/${id}`;
    return api.delete(baseUrl);
}

export {
    getWithdrawals,
    getUserWithdrawals,
    createWithdrawal,
    updateWithdrawal,
    deleteWithdrawal,
};
