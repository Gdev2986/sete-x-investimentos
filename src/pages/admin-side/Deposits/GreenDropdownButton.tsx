import { useState } from 'react';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import swal from 'sweetalert2';

const GreenDropdownButton = () => {
    // Função para mostrar o alerta de exclusão atualizado
    const showDeleteAlert = () => {
        swal.fire({
            title: 'Tem Certeza?',
            text: "Essa ação não pode ser Desfeita!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#28bb4b', // Verde para o botão de confirmação
            cancelButtonColor: '#f34e4e', // Vermelho para o botão de cancelamento
            confirmButtonText: 'Sim, Excluir!',
        }).then((result) => {
            if (result.value) {
                swal.fire('Excluído!', 'Excluído com sucesso.', 'success');
            }
        });
    };

    // Função para mostrar o alerta de sucesso
    const showSuccessAlert = () => {
        swal.fire({
            title: 'Alteração realizada!',
            html: 'Status alterado com sucesso!<br>Uma notificação foi enviada aos usuários.',
            icon: 'success',
        });
    };

    // Estado para controlar o hover no item de exclusão
    const [hover, setHover] = useState(false);

    return (
        <Dropdown as={ButtonGroup} className="mb-2 me-1">
            <Dropdown.Toggle variant="success">
                Editar
                <i className="mdi mdi-chevron-down ms-1"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item
                    onClick={showDeleteAlert}
                    onMouseEnter={() => setHover(true)} // Ativa o hover
                    onMouseLeave={() => setHover(false)} // Desativa o hover
                    style={{
                        backgroundColor: hover ? '#D22222' : '#FFFFFF', // Fundo vermelho no hover, branco padrão
                        color: hover ? '#FFFFFF' : '#000000', // Texto branco no hover, preto padrão
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'background-color 0.1s, color 0.1s', 
                        marginTop: '-8px',
                        marginBottom: '-8px'
                    }}
                >
                    <i
                        className="mdi mdi-trash-can-outline"
                        style={{
                            marginRight: '5px',
                            color: hover ? '#FFFFFF' : '#000000', // Ícone branco no hover, preto padrão
                        }}
                    ></i>
                    Excluir
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default GreenDropdownButton;
