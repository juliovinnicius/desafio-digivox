import React, { useEffect, useState } from 'react';
import { Table, Button, Row, Modal, Form } from 'react-bootstrap';
import { MdDelete, MdEdit } from "react-icons/md";
import { BsPlus, BsFillCalendarFill } from "react-icons/bs";

import NavbarComponent from '../../components/navbar';
import './styles.css';
import api from '../../services/api';
import cpfMask from '../../shared/cpfMask';
import dateMask from '../../shared/dateMask';

export default function BooksPage () {
  const [book, setbook] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowRent, setModalShowRent] = useState(false);
  const [modalShowReserve, setModalShowReserve] = useState(false);
  const [id, setId] = useState();
  const [price, setPrice] = useState();
  const [title, setTitle] = useState('');


  useEffect(() => {
    api.get('/api/books').then(response => {
      setbook(response.data);
    })
  }, []
  );

  function refreshPage () {
    window.location.reload(false);
  }



  function RentBook (props) {
    const [cpf, setCpf] = useState('');
    const [rentDate, setRentDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const data = {
      cpf,
      rentDate,
      endDate
    }

    //REQUISIÇÃO ALTERAR LIVRO
    async function handleRentBook (id) {
      try {
        await api.put(`/api/book/${id}/rent`, data);
        // history.push('/books')
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
            Alugar Livro
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group >
              <Form.Label>Cpf do cliente</Form.Label>
              <Form.Control
                placeholder="Escreva o cpf do cliente"
                value={cpfMask(cpf)}
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
            <Form.Group>
              <Form.Label>Data do ínicio do aluguel</Form.Label>
              <Form.Control
                placeholder="Escreva a data do aluguel"
                value={dateMask(rentDate)}
                onChange={e => setRentDate(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Data da devolução</Form.Label>
              <Form.Control
                placeholder="Escreva a data de devolução"
                value={dateMask(endDate)}
                onChange={e => setEndDate(e.target.value)} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Preço</Form.Label>
              <Form.Control
                value={Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(price)}
                readOnly />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide} >Cancelar</Button>
          <Button onClick={() => handleRentBook(id)} >Alugar</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function ReserveBook (props) {
    const [cpf, setCpf] = useState('');
    const [reservationDate, setReservationDate] = useState('');

    const data = {
      cpf,
      reservationDate
    }

    //REQUISIÇÃO RESERVAR LIVRO
    async function handleReserveBook (id) {
      try {
        await api.put(`/api/book/${id}/reservation`, data);
        // history.push('/books')
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
            Reservar Livro
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group >
              <Form.Label>Cpf do cliente</Form.Label>
              <Form.Control
                placeholder="Escreva o cpf do cliente"
                value={cpfMask(cpf)}
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
            <Form.Group>
              <Form.Label>Data da reserva</Form.Label>
              <Form.Control
                placeholder="Escreva a data da reserva"
                value={dateMask(reservationDate)}
                onChange={e => setReservationDate(e.target.value)} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide} >Cancelar</Button>
          <Button onClick={() => { handleReserveBook(id) }} >Reservar</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function UpdateBook (props) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [edition, setEdition] = useState('');
    const [price, setPrice] = useState('');

    const data = {
      title,
      author,
      edition,
      price
    }

    //REQUISIÇÃO ALTERAR LIVRO
    async function handlePutBook (id) {
      try {
        await api.put(`/api/book/${id}`, data);
        // history.push('/books')
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
            Atualizar Livro
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group >
              <Form.Label>Título do livro</Form.Label>
              <Form.Control
                placeholder="Escreva o título do livro"
                value={title}
                onChange={e => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formAuthor">
              <Form.Label>Digite o nome do ecritor</Form.Label>
              <Form.Control
                placeholder="Escreva o nome do autor"
                value={author}
                onChange={e => setAuthor(e.target.value)} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Edição</Form.Label>
              <Form.Control
                placeholder="Escreva a edição"
                value={edition}
                onChange={e => setEdition(e.target.value)} />
            </Form.Group>
            <Form.Group >
              <Form.Label>Preço</Form.Label>
              <Form.Control
                placeholder="Escreva o preço"
                value={price}
                onChange={e => setPrice(e.target.value)} />
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
      await api.delete(`/api/book/${id}`, {
      });

      setbook(book.filter(book => book.id !== id));
    } catch (err) {
      alert('Erro ao deletar o livro, tente novamente.');
    }
  }

  return (
    <div className="div-book">
      <NavbarComponent />
      <h2>Livros</h2>
      {
        book.length !== 0
          ? book.map(book => (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Título</th>
                  <th>Autor</th>
                  <th>Edição</th>
                  <th>Preço</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{book.id}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.edition}</td>
                  <td>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', }).format(book.price)}</td>
                  <td>
                    <Row>
                      <div >
                        <button className="button-delete" type="button" onClick={() => { setModalShowRent(true); setPrice(book.price); setTitle(book.title); setId(book.id) }}>
                          <BsPlus size={24} />
                        </button>
                      </div>
                      <div style={{ marginLeft: 5 + 'px' }} >
                        <button className="button-delete" type="button" onClick={() => { setModalShowReserve(true); setTitle(book.title); setId(book.id) }}>
                          <BsFillCalendarFill size={18} />
                        </button>
                      </div>
                      <div style={{ marginLeft: 5 + 'px' }}>
                        <button className="button-delete" onClick={() => { setModalShow(true); setId(book.id) }} type="button">
                          <MdEdit size={24} color="#046307" />
                        </button>
                      </div>
                      <div style={{ marginLeft: 5 + 'px' }}  >
                        <button className="button-delete" onClick={() => handleDeleteBook(book.id)} type="button">
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
            <h4>Não tem livros cadastrados</h4>
          </div>
      }
      <ReserveBook
        show={modalShowReserve}
        onHide={() => setModalShowReserve(false)}
        id={id}
        title={title}
      />
      <RentBook
        show={modalShowRent}
        onHide={() => setModalShowRent(false)}
        id={id}
        price={price}
        title={title}
      />
      <UpdateBook
        show={modalShow}
        onHide={() => setModalShow(false)}
        id={id}
      />
    </div>
  );
}