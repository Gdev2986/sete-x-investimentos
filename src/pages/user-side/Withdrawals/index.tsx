import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import CustomTable from './CustomTable';
// hooks
import { usePageTitle } from '../../../hooks';
// API para buscar o saldo
import { getUserById } from '../../../helpers/api/users';

const WithdrawalsUser = () => {
    const [saldoDisponivel, setSaldoDisponivel] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Obter o ID do usuário logado
    const userId = localStorage.getItem('user_id') || sessionStorage.getItem('user_id');

    usePageTitle({
        title: 'Retiradas',
        breadCrumbItems: [
            {
                path: '/dashboard-user',
                label: 'Retiradas',
                active: true,
            },
        ],
    });

    useEffect(() => {
        const fetchSaldo = async () => {
            try {
                if (userId) {
                    const response = await getUserById(Number(userId));
                    setSaldoDisponivel(response.data.saldoDisponivel || 0); // Atualiza o saldo
                }
            } catch (error) {
                console.error('Erro ao buscar o saldo do usuário:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSaldo();
    }, [userId]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <>
            <Row>
                <Col xl={12}>
                    <CustomTable saldoDisponivel={saldoDisponivel!} />
                </Col>
            </Row>
        </>
    );
};

export default WithdrawalsUser;
