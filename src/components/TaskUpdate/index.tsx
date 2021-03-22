import { useEffect, useState } from 'react'
import { Button, Form, Jumbotron, Modal } from 'react-bootstrap'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Task } from '../../models/task.model'
import api from './../../api/api'

interface IdProps {
  id: string
}
const TaskUpdate = () => {
  const params = useParams()
  const { id } = params as IdProps
  const history = useHistory()

  const [showModal, setShowModal] = useState(false)
  const [formValidation, setFormValidation] = useState(false)
  const [task, setTask] = useState('')
  const [showModalError, setShowModalError] = useState(false)

  useEffect(() => {
    const getTask = async () => {
      try {
        let { data } = await api.get(`/manager-task/${id}`)
        setTask(data.name)
      } catch (error) {
        history.push('/')
        console.log(error)
      }
    }
    getTask()
  }, [history, id])

  const update = async (event: any) => {
    event.preventDefault()
    setFormValidation(true)
    if (event.currentTarget.checkValidity() === true) {
      try {
        const updateTask = new Task(null, task, false)
        console.log('updateTask', updateTask)

        await api.put(`/manager-task/${id}`, updateTask)
        setShowModal(true)
      } catch (error) {
        console.log(error)
        setShowModalError(true)
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
      <h3 className="text-center">Atualizar</h3>
      <Jumbotron>
        <Form noValidate onSubmit={update} validated={formValidation}>
          <Form.Group>
            <Form.Label>Tarefa</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite a tarefa"
              minLength={5}
              maxLength={100}
              required
              data-textid="txt-"
              value={task}
              onChange={(event) => setTask(event.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              A tarefa deve conter ao menos 5 caracteres
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="text-center">
            <Button variant="success" type="submit" data-testid="btn-atualizar">
              Atualizar
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
          <Modal.Body>Tarefa Atualizada com Sucesso!!!</Modal.Body>
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
          <Modal.Body>Erro ao Atualizar Tarefa. Tente Novamente!!!</Modal.Body>
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

export { TaskUpdate }
