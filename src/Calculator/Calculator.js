import React, { useState } from 'react'
import CalculatorService from './calculador.service'
import './styles.css'

import { Jumbotron, Container, Row, Col, Button, Form } from 'react-bootstrap'

function Calculator() {
  const [calc, concatNumber] = CalculatorService()

  const [txtNumeros, setTxtNumeros] = useState('0')
  const [numero1, setNumero1] = useState('0')
  const [numero2, setNumero2] = useState(null)
  const [operacao, setOperacao] = useState(null)

  const addNumber = (number) => {
    let result
    if (operacao === null) {
      result = concatNumber(numero1, number)
      setNumero1(result)
    } else {
      result = concatNumber(numero2, number)
      setNumero2(result)
    }
    console.log(result)

    setTxtNumeros(result)
  }

  const defaultOperation = (operation) => {
    if (operacao === null) {
      setOperacao(operation)
      return
    }

    if (numero2 !== null) {
      const result = calc(parseFloat(numero1), parseFloat(numero2), operacao)
      setOperacao(operation)
      setNumero1(result.toString())
      setNumero2(null)
      setTxtNumeros(result.toString())
    }
  }

  const actionCalc = () => {
    if (numero2 === null) {
      return
    }
    const result = calc(parseFloat(numero1), parseFloat(numero2), operacao)
    setTxtNumeros(result.toString())
  }

  const resetCalc = () => {
    setTxtNumeros('0')
    setNumero1('0')
    setNumero2(null)
    setOperacao(null)
  }
  return (
    <Jumbotron
      style={{
        background: 'transparent !important',
        backgroundColor: '#007bff',
        padding: '5px',
        margin: '5px',
        width: '400px'
      }}
    >
      <Container>
        <Row>
          <Col xs="3">
            <Button onClick={resetCalc} variant="danger">
              C
            </Button>
          </Col>
          <Col xs="9">
            <Form.Control
              type="text"
              name="txtNumeros"
              readOnly
              className="text-right"
              value={txtNumeros}
              data-testid="txtNumeros"
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Button variant="light" onClick={() => addNumber(7)}>
              7
            </Button>
          </Col>
          <Col>
            <Button variant="light" onClick={() => addNumber(8)}>
              8
            </Button>
          </Col>
          <Col>
            <Button variant="light" onClick={() => addNumber(9)}>
              9
            </Button>
          </Col>
          <Col>
            <Button variant="warning" onClick={() => defaultOperation('/')}>
              /
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button variant="light" onClick={() => addNumber(4)}>
              4
            </Button>
          </Col>
          <Col>
            <Button variant="light" onClick={() => addNumber(5)}>
              5
            </Button>
          </Col>
          <Col>
            <Button variant="light" onClick={() => addNumber(6)}>
              6
            </Button>
          </Col>
          <Col>
            <Button variant="warning" onClick={() => defaultOperation('*')}>
              *
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button variant="light" onClick={() => addNumber(1)}>
              1
            </Button>
          </Col>
          <Col>
            <Button variant="light" onClick={() => addNumber(2)}>
              2
            </Button>
          </Col>
          <Col>
            <Button variant="light" onClick={() => addNumber(3)}>
              3
            </Button>
          </Col>
          <Col>
            <Button variant="warning" onClick={() => defaultOperation('-')}>
              -
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Button variant="light" onClick={() => addNumber('0')}>
              0
            </Button>
          </Col>
          <Col>
            <Button variant="light" onClick={() => addNumber('.')}>
              .
            </Button>
          </Col>
          <Col>
            <Button variant="success" onClick={actionCalc}>
              =
            </Button>
          </Col>
          <Col>
            <Button variant="warning" onClick={() => defaultOperation('+')}>
              +
            </Button>
          </Col>
        </Row>
      </Container>
    </Jumbotron>
  )
}

export default Calculator
