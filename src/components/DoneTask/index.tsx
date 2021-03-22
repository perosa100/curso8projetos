import { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons'
import api from './../../api/api'

type taskProps = {
  id: number
  name: string
  done: boolean
}

export type PropsDoneTask = {
  tasks: taskProps
  LoadingTasks: (arg: boolean) => void
  className?: string
}
function DoneTask({ tasks, LoadingTasks, className }: PropsDoneTask) {
  const [showModal, setShowModal] = useState(false)
  const [showModalError, setShowModalError] = useState(false)

  const handleShowModal = (e: any) => {
    e.preventDefault()
    setShowModal(true)
  }

  const handleFecharModal = (e: any) => {
    setShowModal(false)
  }

  const handleDoneTask = async (e: any) => {
    e.preventDefault()
    try {
      await api.put(`/manager-task/${tasks.id}/done`)
      setShowModal(false)
      LoadingTasks(true)
    } catch (error) {
      setShowModal(false)
      setShowModalError(true)
    }
  }

  const handleCloseModalError = (event: any) => {
    setShowModalError(false)
  }

  return (
    <span className={className}>
      <Button
        className="btn-sm"
        onClick={handleShowModal}
        data-testid="btn-abrir-modal"
        style={{ background: 'green', border: '1px solid green' }}
      >
        <FontAwesomeIcon icon={faClipboardCheck} />
      </Button>
      <Modal show={showModal} onHide={handleFecharModal} data-testid="modal">
        <Modal.Header closeButton>
          <Modal.Title>Concluir tarefa</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deseja realmente concluir a seguinte tarefa?
          <br />
          <strong>{tasks.name}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleDoneTask}
            data-testid="btn-concluir"
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

export { DoneTask }
