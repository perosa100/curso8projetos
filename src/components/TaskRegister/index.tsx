import React, { useState } from 'react'
import { Jumbotron, Form, Button, Modal } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { Task } from '../../models/task.model'

const TaskRegister = () => {
  const [task, setTask] = useState('')
  const [formValidation, setFormValidation] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const history = useHistory()

  const onSubmit = (event: any) => {
    event.preventDefault()
    setFormValidation(true)
    if (event.currentTarget.checkValidity() === true) {
      const taskDb = localStorage['task']
      const tasks = taskDb ? JSON.parse(taskDb) : []

      tasks.push(new Task(new Date().getTime(), task, false))
      localStorage['task'] = JSON.stringify(tasks)

      setShowModal(true)
    }
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
      </Jumbotron>
    </div>
  )
}

export { TaskRegister }
