import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import api from './../../api/api'

type taskProps = {
  id: number
  name: string
  done: boolean
}

export type PropsDoneTask = {
  tasks: taskProps
  LoadingTasks: (arg: boolean) => void
}

function DeleteTask({ tasks, LoadingTasks }: PropsDoneTask) {
  const [showModal, setShowModal] = useState(false)
  const [showModalError, setShowModalError] = useState(false)

  const handleShowModal = (e: any) => {
    e.preventDefault()
    setShowModal(true)
  }

  const handleFecharModal = (e: any) => {
    setShowModal(false)
  }

  const handleCloseModalError = (event: any) => {
    setShowModalError(false)
  }

  const handleDeleteTask = async (e: any) => {
    e.preventDefault()
    try {
      await api.delete(`/manager-task/${tasks.id}`)
      setShowModal(false)
      LoadingTasks(true)
    } catch (error) {
      setShowModal(false)
      setShowModalError(true)
    }
  }

  return (
    <span>
      <Button
        className="btn-sm"
        onClick={handleShowModal}
        data-testid="btn-abrir-modal"
        style={{ background: 'red', border: '1px solid red' }}
      >
        <FontAwesomeIcon icon={faTrashAlt} />
      </Button>
      <Modal show={showModal} onHide={handleFecharModal} data-testid="modal">
        <Modal.Header closeButton>
          <Modal.Title>Deletar tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja realmente Deletar a seguinte tarefa?
          <br />
          <strong>{tasks.name}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleDeleteTask}
            data-testid="btn-remover"
          >
            Sim
          </Button>
          <Button
            variant="light"
            onClick={handleFecharModal}
            data-testid="btn-fechar-modal"
          >
            Não
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
    </span>
  )
}

export { DeleteTask }
