import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Button, Modal } from 'react-bootstrap';

import './styles.css';
import api from '../../services/api';

export default function NavbarComponent () {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowClient, setModalShowClient] = useState(false);

  function refreshPage () {
    window.location.reload(false);
  }

  //MODAL REGISTRO DE CLIENTES
  function ResgisterClient (props) {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [validate, setValidate] = useState(false);

    //TESTE
    // async function handleSubmit (client) {
    //   const form = client.currentTarget;
    //   if (form.checkValidity() === false) {
    //     client.preventDefault();
    //     client.stopPropagation();
    //   }

    //   setValidate(true);

    //   if (validate) {
    //     await handleNewClient();
    //   }
    // };

    //REQUISIÇÃO CADASTRO DE CLIENTE
    async function handleNewClient (client) {

      const form = client.currentTarget;
      if (form.checkValidity() === false) {
        client.preventDefault();
        client.stopPropagation();
        return;
      }

      setValidate(true);

      const data = {
        name,
        cpf
      };

      try {
        await api.post('/api/client/', data);
        refreshPage();
        setModalShowClient(false);
      } catch (err) {
        alert('Erro ao tentar cadastrar cliente, tente novamente.')
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
            Cadastro de cliente
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validate} >
            <Form.Group >
              <Form.Label>Nome do cliente</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do cliente"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Porfavor insira o nome do cliente
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formAuthor">
              <Form.Label>Cpf</Form.Label>
              <Form.Control
                required
                placeholder="Escreva o cpf do cliente"
                value={cpf}
                onChange={e => setCpf(e.target.value)} />
              <Form.Control.Feedback type="invalid">
                Porfavor insira o cpf do cliente
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.onHide} >Cancelar</Button>
          <Button onClick={handleNewClient} >Cadastrar</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function ResgisterBook (props) {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [edition, setEdition] = useState('');
    const [price, setPrice] = useState('');

    //REQUISIÇÃO CADASTRO DE LIVRO
    async function handleNewBook (e) {
      e.preventDefault();

      const data = {
        title,
        author,
        edition,
        price
      };

      try {
        await api.post('/api/book/', data);
        refreshPage();
        setModalShow(false);
      } catch (err) {
        alert('Erro ao tentar cadastrar livro, tente novamente.')
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
            Cadastro de livro
        </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group >
              <Form.Label>Título do Livro</Form.Label>
              <Form.Control
                placeholder="Escreva o título do livro"
                value={title}
                onChange={e => setTitle(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="formAuthor">
              <Form.Label>Autor</Form.Label>
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
          <Button onClick={handleNewBook} >Cadastrar</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className="div-navbar">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Digivox-Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/books">Livros</Nav.Link>
            <Nav.Link href="/clients">Clientes</Nav.Link>
            <Form inline>
              <FormControl type="text" placeholder="Insira o nome do livro" className="mr-sm-2" />
              <Button variant="outline-info">Procurar</Button>
            </Form>
          </Nav>
          <Nav>
            <Button variant="primary" onClick={() => setModalShowClient(true)}>Cadastrar Cliente</Button>
            <Button variant="danger" onClick={() => setModalShow(true)}>Cadastrar Livro</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <ResgisterClient
        show={modalShowClient}
        onHide={() => setModalShowClient(false)}
      />
      <ResgisterBook
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}