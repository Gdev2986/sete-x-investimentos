import { useState } from 'react';
import React from 'react';
import { Button } from 'react-bootstrap';
import swal from 'sweetalert2';

const GreenSaveButton = () => {
    const [isDisabled, setIsDisabled] = useState(true); // Botão desativado por padrão

    // Função para mostrar o modal de confirmação
    const showConfirmationModal = () => {
        swal.fire({
            title: 'Tem Certeza?',
            text: "Uma notificação será enviada para o Usuário.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28bb4b', // Verde para o botão de confirmação
            cancelButtonColor: '#f34e4e', // Vermelho para o botão de cancelamento
            confirmButtonText: 'Alterar Status',
        }).then((result) => {
            if (result.value) {
                swal.fire('Alteração Realizada!', 'Status alterado com sucesso, o cliente foi notificado.', 'success');
                setIsDisabled(true); // Desativa o botão após a ação ser confirmada
            }
        });
    };

    // Habilitar o botão "Salvar" quando houver alterações
    const handleStatusChange = () => {
        setIsDisabled(false);
    };

    return (
        <Button
            variant="success"
            disabled={isDisabled}
            onClick={showConfirmationModal}
            style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
        >
            Salvar
        </Button>
    );
};

export default GreenSaveButton;
