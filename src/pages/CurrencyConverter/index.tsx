import React, { ChangeEvent, useState } from 'react'
import {
  Jumbotron,
  Button,
  Form,
  Col,
  Spinner,
  Alert,
  Modal
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons'
import { ListCoins } from '../../components/ListCoins'

import './styles.css'
import axios from 'axios'
const FIXED_URL =
  'http://data.fixer.io/api/latest?access_key=0b8dccb8eec6443db81e74823465c65f&format=1'

function CurrencyConverter() {
  const [value, setValue] = useState(1)
  const [coinIn, setCoinIn] = useState('USD')
  const [coinFor, setCoinFor] = useState('BRL')
  const [loading, setLoading] = useState(false)
  const [formValidation, setFormValidation] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [resultCoins, setResultCoins] = useState('')
  const [showError, setShowError] = useState(false)

  const handleSubmit = (event: any) => {
    event.preventDefault()
    setFormValidation(true)
    if (event.currentTarget.checkValidity() === true) {
      setLoading(true)
      axios
        .get(FIXED_URL)
        .then((response) => {
          const price = getPrice(response.data)
          if (price) {
            setResultCoins(`${value} ${coinIn} = ${price} ${coinFor}`)
            setShowModal(true)
            setLoading(false)
            setShowError(false)
          } else {
            showErrors()
          }
        })
        .catch((err) => showErrors())
    }
  }

  const showErrors = () => {
    setShowError(true)
    setLoading(false)
  }

  const getPrice = (cotacion: any) => {
    if (!cotacion || cotacion.success !== true) {
      return false
    } else {
      const PriceIn = cotacion.rates[coinIn]
      const PriceFor = cotacion.rates[coinFor]
      const price = (1 / PriceIn) * PriceFor * value

      return price.toFixed(2)
    }
  }

  const handleValue = (event: any) => {
    setValue(event.target.value.replace(/\D/g, ''))
  }

  const handleCoinIn = (event: any) => {
    setCoinIn(event.target.value)
  }

  const handleCoinFor = (event: any) => {
    setCoinFor(event.target.value)
  }

  const handleCloseModal = (event: any) => {
    setValue(1)
    setCoinIn('USD')
    setCoinFor('BRL')
    setFormValidation(false)
    setShowModal(false)
  }
  return (
    <>
      <h1>Currency Converter</h1>
      <Alert variant="danger" show={showError}>
        Erro obtendo dados de conversão, tente novamente
      </Alert>
      <Jumbotron>
        <Form onSubmit={handleSubmit} noValidate validated={formValidation}>
          <Form.Row>
            <Col sm="3">
              <Form.Control
                placeholder="0"
                value={value}
                onChange={handleValue}
                required
              />
            </Col>
            <Col sm="3">
              <Form.Control
                as="select"
                value={coinIn}
                onChange={handleCoinIn}
                required
              >
                <ListCoins />
              </Form.Control>
            </Col>
            <Col sm="1" style={{ paddingTop: '5px' }}>
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Col>
            <Col sm="3">
              <Form.Control
                as="select"
                value={coinFor}
                onChange={handleCoinFor}
                required
              >
                <ListCoins />
              </Form.Control>
            </Col>
            <Col sm="2">
              <Button variant="success" type="submit" data-testid="btn-convert">
                <span className={loading ? '' : 'hidden'}>
                  <Spinner animation="border" size="sm" />
                </span>
                <span className={loading ? 'hidden' : ''}>Converter</span>
              </Button>
            </Col>
          </Form.Row>
        </Form>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Conversão</Modal.Title>
          </Modal.Header>
          <Modal.Body data-testid="modal">{resultCoins}</Modal.Body>
          <Modal.Footer onClick={handleCloseModal}>
            <Button variant="success">Nova Conversão</Button>
          </Modal.Footer>
        </Modal>
      </Jumbotron>
    </>
  )
}

export { CurrencyConverter }
