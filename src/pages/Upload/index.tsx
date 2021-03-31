import { useState } from 'react'
import { Button, Form, Jumbotron, Spinner, Image, Modal } from 'react-bootstrap'
import api from '../../api/api'
import './styles.css'

const Upload = () => {
  const [imagem, setImagem] = useState()
  const [desabilitaButton, setDesabilitaButton] = useState(true)
  const [urlImagem, setUrlImagem] = useState('')
  const [showImagem, setShowImagem] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showProces, setShowProces] = useState(false)

  const handleUpload = async (event: any) => {
    event.preventDefault()
    try {
      setShowProces(true)
      setDesabilitaButton(true)

      const formData = new FormData()

      formData.append('imagem', imagem)

      const { data } = await api.post('/mini-ecommerces/uploads', formData)

      setUrlImagem(data.path)
      setShowImagem(true)
    } catch (error) {
      console.log(error)
      setShowProces(false)
      setShowModal(true)
    }

    setShowProces(false)
    setDesabilitaButton(false)
  }
  const handleImagem = (event: any) => {
    setImagem(event.target.files[0])
    setDesabilitaButton(false)
  }
  const handleCloseModalError = (event: any) => {
    setShowModal(false)
  }

  return (
    <div>
      <h3>Uploads de imagens</h3>
      <Jumbotron>
        <Form noValidate onSubmit={handleUpload}>
          <Form.Group>
            <Form.Label>Selecione uma imagem png ou img</Form.Label>
            <Form.Control
              type="file"
              accept="image/png image/jpeg"
              onChange={handleImagem}
            />
          </Form.Group>
          <Form.Group className="text-center">
            <Button variant="success" type="submit" disabled={desabilitaButton}>
              <span>Fazer Upload</span>
            </Button>
          </Form.Group>
          <Form.Group className={showProces ? 'text-center' : 'hidden'}>
            <Spinner animation="border" />
          </Form.Group>
        </Form>

        <div className={showImagem ? 'text-center' : 'hidden'}>
          <hr />
          <a href={urlImagem} rel="noreferrer" target="_blank">
            <Image src={urlImagem} thumbnail />
            <br />
            {urlImagem}
          </a>
        </div>
      </Jumbotron>

      <Modal show={showModal} onHide={handleCloseModalError}>
        <Modal.Header>
          <Modal.Title>Erro ao fazer upload de Imagem</Modal.Title>
        </Modal.Header>
        <Modal.Body>Não foi possivel tente novamente!!!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            type="submit"
            onSubmit={handleCloseModalError}
          >
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export { Upload }
