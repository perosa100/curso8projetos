import { Form, Row, Col, Button, Modal, Jumbotron } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker, { registerLocale } from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'
import './styles.css'
import { ListStates } from './ListStates'
import { ListCity } from './ListCity'
import { Formik } from 'formik'
import { useState } from 'react'
import * as yup from 'yup'
import api from '../../api/api'
import { VerificaCPF } from '../../utils/validaCpf'

registerLocale('pt', pt)

type CheckOutProps = {
  visivel: boolean
  handleShowProducts: () => void
  total: string
  products: object
  handleResetCar: () => void
}
const CheckOut = ({
  handleResetCar,
  handleShowProducts,
  products,
  total,
  visivel
}: CheckOutProps) => {
  const [dataNasc, setDataNasc] = useState(null)
  const [formSend, setFormSend] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false)

  const schema = yup.object({
    email: yup.string().required(),
    name: yup.string().required().min(5),
    cpf: yup
      .string()
      .required()
      .min(14)
      .max(14)
      .test('cpf-valido', ' CPF Inválido', (cpf) => VerificaCPF(cpf)),
    address: yup.string().required().min(5),
    city: yup.string().required(),
    states: yup.string().required(),
    cep: yup.string().required().min(9).max(9),
    emailPromotional: yup.string().required(),
    termCondiction: yup.string().oneOf(['true'])
  })
  const visible = () => {
    return visivel ? null : 'hidden'
  }

  const finishCompare = async (values: any) => {
    if (!dataNasc) {
      setFormSend(true)
      return
    }

    values.dataNasc = dataNasc
    values.products = JSON.stringify(products)
    values.total = `R$ ${total}`

    const data = [values.dataNasc, values.products, values.total]

    try {
      console.log(values)
      await api.post('/mini-ecommerces/checkout/done', data)
      setShowModal(true)
      handleResetCar()
    } catch (error) {
      setShowErrorModal(true)
    }
  }

  const handleBirthDate = (data: any) => {
    setDataNasc(data)
  }

  const datePickerCss = () => {
    if (!formSend) {
      return 'form-control'
    }
    if (dataNasc) {
      return 'form-control is-valid'
    } else {
      return 'form-control is-invalid'
    }
  }

  const handleContinue = () => {
    setShowModal(false)
    handleShowProducts()
  }

  const handleShowErrorModal = () => {
    setShowErrorModal(false)
  }

  return (
    <Jumbotron fluid style={{ margin: '10px' }} className={visible()}>
      <h3 className="text-center">Finalizar Compra</h3>
      <Formik
        onSubmit={(values) => finishCompare(values)}
        initialValues={{
          email: '',
          name: '',
          birthDate: '',
          cpf: '',
          address: '',
          state: '',
          city: '',
          cep: '',
          emailPromotional: 'S',
          termCondiction: false
        }}
        validationSchema={schema}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate style={{ margin: '10px' }} onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="email">
              <Form.Label column sm={3}>
                E-mail
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="email"
                  placeholder="Digite o seu E-mail"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  Digite um e-mail válido.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="name">
              <Form.Label column sm={3}>
                Nome Completo
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Nome Completo"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isValid={touched.name && !errors.name}
                  isInvalid={touched.name && !!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  Digite um nome (minimo de 5 caracteres).
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="birthDate">
              <Form.Label column sm={3}>
                Data de Nascimento
              </Form.Label>
              <Col sm={9}>
                <DatePicker
                  locale="pt"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Selecione a data"
                  withPortal
                  selected={dataNasc}
                  onChange={handleBirthDate}
                  className={datePickerCss()}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="cpf">
              <Form.Label column sm={3}>
                CPF
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="CPF"
                  name="cpf"
                  value={values.cpf}
                  onChange={handleChange}
                  isValid={touched.cpf && !errors.cpf}
                  isInvalid={touched.cpf && !!errors.cpf}
                />
                <Form.Control.Feedback type="invalid">
                  Digite um cpf valido.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="address">
              <Form.Label column sm={3}>
                Endereço
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder=" Digite um endereço "
                  name="address"
                  value={values.address}
                  onChange={handleChange}
                  isValid={touched.address && !errors.address}
                  isInvalid={touched.address && !!errors.address}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Digite um endereço (minimo de 5 caracteres).
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="state">
              <Form.Label column sm={3}>
                Estado
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as="select"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  isValid={touched.state && !errors.state}
                  isInvalid={touched.state && !!errors.state}
                >
                  <option value="">Selecione o estado</option>
                  <ListStates />
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Selecione um Estado.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="city">
              <Form.Label column sm={3}>
                Cidade
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  as="select"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  isValid={touched.city && !errors.city}
                  isInvalid={touched.city && !!errors.city}
                >
                  <option value="">Selecione a cidade</option>
                  <ListCity state={values.state} />
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Selecione um Cidade.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="cep">
              <Form.Label column sm={3}>
                CEP
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder=" Digite um CEP "
                  name="cep"
                  value={values.cep}
                  onChange={handleChange}
                  isValid={touched.cep && !errors.cep}
                  isInvalid={touched.cep && !!errors.cep}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  Digite um CEP valido.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="emailPromotional">
              <Form.Label column sm={12}>
                Deseja receber e-mails com promoções?
              </Form.Label>
              <Col sm={9}>
                <Form.Check
                  inline
                  name="emailPromotional"
                  type="radio"
                  id="emailPromotionalYes"
                  value="S"
                  label="Sim"
                  style={{ marginLeft: '15px' }}
                  checked={values.emailPromotional === 'S'}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  name="emailPromotional"
                  type="radio"
                  id="emailPromotionalNo"
                  value="N"
                  label="Não"
                  style={{ marginLeft: '15px' }}
                  checked={values.emailPromotional === 'N'}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="termCondiction">
              <Col sm={12}>
                <Form.Check
                  name="termCondiction"
                  type="checkbox"
                  style={{ marginLeft: '15px' }}
                  label="Concordo com os termos e condições"
                  value={String(values.termCondiction)}
                  onChange={handleChange}
                  isValid={touched.termCondiction && !errors.termCondiction}
                  isInvalid={touched.termCondiction && !!errors.termCondiction}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="doneBuy">
              <Col sm={12} className="text-center">
                <Button variant="success" type="submit" onClick={finishCompare}>
                  Finalizar Compra
                </Button>
              </Col>
            </Form.Group>
          </Form>
        )}
      </Formik>

      <Modal show={showModal} onHide={handleContinue} data-testid="modal">
        <Modal.Header closeButton>
          <Modal.Title>Compra Finalizada com Sucesso!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Um e-mail de confirmação foi enviado com os detalhe da transação.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleContinue}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showErrorModal}
        onHide={handleShowErrorModal}
        data-testid="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Erro ao finalizar a compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tente novamente.</Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleShowErrorModal}>
            Voltar
          </Button>
        </Modal.Footer>
      </Modal>
    </Jumbotron>
  )
}

export { CheckOut }
