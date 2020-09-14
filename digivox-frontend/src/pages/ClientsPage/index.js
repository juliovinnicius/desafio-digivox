import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Modal, Form } from 'react-bootstrap';
import { MdDelete, MdEdit } from "react-icons/md";

import NavbarComponent from '../../components/navbar';

import './styles.css';
import api from '../../services/api';

export default function ClientsPage () {
  const [client, setClient] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    api.get('/api/clients').then(response => {
      setClient(response.data);
    })
  }, []
  );

  function refreshPage () {
    window.location.reload(false);
  }

  function UpdateClient (props) {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');

    const data = {
      name,
      cpf
    }

    //REQUISIÇÃO ALTERAR LIVRO
    async function handlePutBook (id) {
      try {
        await api.put(`/api/client/${id}`, data);
        refreshPage();
      } catch (err) {
        alert('Erro ao alterar o livro, tente novamente.' + err);
      }
    }

    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Atualizar cliente
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group >
              <Form.Label>Nome do cliente</Form.Label>
              <Form.Control
                placeholder="Escreva o nome do cliente"
                value={name}
                onChange={e => setName(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formAuthor">
              <Form.Label>Digite o cpf do cliente</Form.Label>
              <Form.Control
                placeholder="Escreva o cpf do cliente"
                value={cpf}
                onChange={e => setCpf(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide} >Cancelar</Button>
          <Button onClick={() => handlePutBook(id)} >Atualizar</Button>
        </Modal.Footer>
      </Modal>
    );
  }



  async function handleDeleteBook (id) {
    try {
      await api.delete(`/api/client/${id}`, {
      });

      setClient(client.filter(client => client.id !== id));
    } catch (err) {
      alert('Erro ao deletar o cliente, tente novamente.');
    }
  }

  return (
    <div>
      <NavbarComponent />
      <h2>Clientes</h2>
      {
        client.length !== 0
          ? client.map(client => (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nome</th>
                  <th>Cpf</th>
                  <th>Livros</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{client.id}</td>
                  <td>{client.name}</td>
                  <td>{client.cpf}</td>
                  {
                    client.books.map(book => (
                      <td>
                        {book.title}
                      </td>
                    ))
                  }
                  <td>
                    <Row>
                      <div >
                        <button className="button-delete" onClick={() => { setModalShow(true); setId(client.id) }} type="button">
                          <MdEdit size={24} color="#046307" />
                        </button>
                      </div>
                      <div style={{ marginLeft: 20 + 'px' }}  >
                        <button className="button-delete" onClick={() => handleDeleteBook(client.id)} type="button">
                          <MdDelete size={24} color="#ff0000" />
                        </button>
                      </div>
                    </Row>
                  </td>
                </tr>

              </tbody>
            </Table>
          ))
          : <div className="div-nocontent" >
            <h4>Não tem clientes cadastrados</h4>
          </div>
      }
      <UpdateClient
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={id}
      />
    </div>
  );
}