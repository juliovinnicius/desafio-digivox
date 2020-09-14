import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

import './styles.css';
import NavbarComponent from '../../components/navbar';
import api from '../../services/api';

export default function DashPage () {
  const [rent, setRent] = useState([]);
  const [devolution, setDevolution] = useState([]);
  const [reserved, setReserved] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [id, setId] = useState();
  const [title, setTitle] = useState('');

  useEffect(() => {
    api.get('/api/dashboard').then(response => {
      setRent(response.data["weekRentedBooks"]);
    })
  }, []
  );

  useEffect(() => {
    api.get('/api/dashboard').then(response => {
      setDevolution(response.data["weekReturnBooks"]);
    })
  }, []
  );

  useEffect(() => {
    api.get('/api/dashboard').then(response => {
      setReserved(response.data["weekReserveBooks"]);
    })
  }, []
  );

  async function handleCancelReserveBook (id) {
    try {
      await api.put(`/api/book/${id}/cancel-reservation`, {});
      refreshPage();
    } catch (err) {
      alert('Erro ao alterar o livro, tente novamente.' + err);
    }
  }

  function DevolutionBook (props) {
    const [cpf, setCpf] = useState('');

    const data = {
      cpf,
    }

    //REQUISIÇÃO DEVOLUÇÃO LIVRO
    async function handleDevolutionBook (id) {
      try {
        await api.put(`/api/book/${id}/devolution`, data);
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
            Devolver Livro
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group >
              <Form.Label>Cpf do cliente</Form.Label>
              <Form.Control
                placeholder="Escreva o cpf do cliente"
                value={cpf}
                onChange={e => setCpf(e.target.value)} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Título do livro</Form.Label>
              <Form.Control
                placeholder="Escreva o título do livro"
                value={props.title}
                onChange={e => setTitle(e.target.value)}
                readOnly />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide} >Cancelar</Button>
          <Button onClick={() => { handleDevolutionBook(id) }} >Devolver</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function refreshPage () {
    window.location.reload(false);
  }

  return (
    <div className="dash-container">
      <NavbarComponent />
      <h2>Aluguel</h2>
      {
        rent.length !== 0
          ? rent.map(book => (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Edição</th>
                  <th>Preço</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.edition}</td>
                  <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(book.price)}</td>
                </tr>

              </tbody>
            </Table>
          ))
          : <div className="div-nocontent" >
            <h4>Não tem aluguel para essa semana</h4>
          </div>

      }
      <h2>Devolução</h2>
      {
        devolution.length !== 0
          ? devolution.map(book => (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Edição</th>
                  <th>Preço</th>
                  <th>Devolução</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.edition}</td>
                  <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(book.price)}</td>
                  <td><Button variant="danger" onClick={() => { setModalShow(true); setTitle(book.title); setId(book.id) }} >Devolução</Button></td>
                </tr>

              </tbody>
            </Table>
          ))
          : <div className="div-nocontent" >
            <h4>Não tem devolução para essa semana</h4>
          </div>
      }
      <h2>Reservas</h2>
      {
        reserved.length !== 0
          ? reserved.map(book => (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Edição</th>
                  <th>Preço</th>
                  <th>Devolução</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.edition}</td>
                  <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(book.price)}</td>
                  <td><Button variant="danger" onClick={() => { handleCancelReserveBook(book.id) }} >Cancelar</Button></td>
                </tr>

              </tbody>
            </Table>
          ))
          : <div className="div-nocontent" >
            <h4>Não tem reservas para essa semana</h4>
          </div>
      }
      <DevolutionBook
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={id}
        title={title}
      />
    </div>
  );
}