import React, { useState } from 'react'
import { Jumbotron, Form, Button, Modal } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { Task } from '../../models/task.model'
import api from './../../api/api'

const TaskRegister = () => {
  const [task, setTask] = useState('')
  const [formValidation, setFormValidation] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showModalError, setShowModalError] = useState(false)

  const history = useHistory()

  const onSubmit = async (event: any) => {
    event.preventDefault()
    setFormValidation(true)
    if (event.currentTarget.checkValidity() === true) {
      try {
        const tasks = new Task(null, task, false)
        await api.post('/manager-task', tasks)
        setShowModal(true)
      } catch (error) {
        setShowModalError(true)
        console.log(error)
      }
    }
  }

  const handleCloseModalError = (event: any) => {
    setShowModalError(false)
  }
  const handleCloseShowModal = (event: any) => {
    history.push('/')
  }

  return (
    <div>
      <h3 className="text-center"> Cadastrar</h3>
      <Jumbotron>
        <Form validated={formValidation} noValidate onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label>Tarefa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite a Tarefa"
              minLength={5}
              maxLength={100}
              required
              value={task}
              onChange={(event) => setTask(event.target.value)}
              data-testid="txt-tarefa"
            />
            <Form.Control.Feedback type="invalid">
              A tarefa deve conter ao menos 5 caracteres
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="text-center">
            <Button variant="success" type="submit" data-testid="btn-cadastrar">
              Cadastrar
            </Button>
            &nbsp; &nbsp;
            <Link to="/" className="btn btn-light">
              Voltar
            </Link>
          </Form.Group>
        </Form>
        <Modal
          show={showModal}
          onHide={handleCloseShowModal}
          data-testid="modal"
        >
          <Modal.Header closeButton>
            <Modal.Title>Sucesso</Modal.Title>
          </Modal.Header>
          <Modal.Body>Tarefa Adicionada com Sucesso!!!</Modal.Body>
          <Modal.Footer>
            <Button
              variant="success"
              type="submit"
              onClick={handleCloseShowModal}
              data-testid="bnt-cadastrar"
            >
              Continuar
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showModalError} onHide={handleCloseModalError}>
          <Modal.Header closeButton>
            <Modal.Title>Erro</Modal.Title>
          </Modal.Header>
          <Modal.Body>Erro ao Adicionar Tarefa Tente Novamente!!!</Modal.Body>
          <Modal.Footer>
            <Button
              variant="warning"
              type="submit"
              onClick={handleCloseModalError}
              data-testid="bnt-cadastrar"
            >
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </div>
  )
}

export { TaskRegister }
