import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
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

    return (
        <Dropdown as={ButtonGroup} className="mb-2 me-1">
            <Dropdown.Toggle variant="success">
                Editar
                <i className="mdi mdi-chevron-down ms-1"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {/* Dropdown "Alterar Status" com dropstart */}
                <Dropdown drop="start" as={ButtonGroup}>
                    <Dropdown.Toggle as={Button} variant="link" className="p-0 m-0 border-0 text-dark d-flex align-items-center">
                        {/* Adicionando margem ao ícone */}
                        <i className="mdi mdi-chevron-left me-1" style={{ marginLeft: '10px' }}></i> Alterar Status
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {/* Adicionando a função de alerta de sucesso ao clicar em qualquer item */}
                        <Dropdown.Item href="#" onClick={showSuccessAlert} style={{ marginTop: '-7px', marginBottom: '-7px' }}>Aprovado</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#" onClick={showSuccessAlert} style={{ marginTop: '-7px', marginBottom: '-7px' }}>Cancelado</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown.Divider />
                <Dropdown.Item 
                    onClick={showDeleteAlert} 
                    style={{ marginTop: '-5px', marginBottom: '-5px' }}>
                    Excluir
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default GreenDropdownButton;
