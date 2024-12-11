import React from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const GreenSaveButton = () => {
    const [isDisabled, setIsDisabled] = useState(true); // Botão desativado por padrão

    // Função para mostrar o modal de confirmação
    const showConfirmationModal = () => {
        Swal.fire({
            title: 'Tem Certeza?',
            text: "Uma notificação será enviada para o Usuário.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28bb4b', // Verde para o botão de confirmação
            cancelButtonColor: '#f34e4e', // Vermelho para o botão de cancelamento
            confirmButtonText: 'Alterar Status',
            backdrop: true, // Ativa o fundo escuro sem desabilitar o scroll da página
            allowOutsideClick: true, // Permite clicar fora para fechar
            allowEscapeKey: true, // Permite fechar com a tecla Esc
            willOpen: () => {
                // Desabilitar a modificação de overflow do body
                document.body.style.overflow = 'unset'; // Mantém o scroll da página
            },
            willClose: () => {
                // Restaurar o comportamento original
                document.body.style.overflow = ''; // Restaurar ao padrão
            },
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Alteração Realizada!', 'Status alterado com sucesso, o cliente foi notificado.', 'success');
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
