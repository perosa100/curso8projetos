import { Form, Row, Col, Button, Modal, Jumbotron } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker, { registerLocale } from 'react-datepicker'
import pt from 'date-fns/locale/pt-BR'

registerLocale('pt', pt)

const CheckOut = () => {
  return (
    <Jumbotron fluid style={{ margin: '10px' }}>
      <h3 className="text-center">Finalizar Compra</h3>

      <Form noValidate style={{ margin: '10px' }}>
        <Form.Group as={Row} controlId="email">
          <Form.Label column sm={3}>
            E-mail
          </Form.Label>
          <Col sm={9}>
            <Form.Control
              type="email"
              placeholder="Digite o seu E-mail"
              name="email"
            />
            <Form.Control.Feedback type="invalid">
              Digite um e-mail válido.
            </Form.Control.Feedback>{' '}
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="name">
          <Form.Label column sm={3}>
            Nome Completo
          </Form.Label>
          <Col sm={9}>
            <Form.Control type="text" placeholder="Nome Completo" name="name" />
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
              onChange={() => {}}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="cpf">
          <Form.Label column sm={3}>
            CPF
          </Form.Label>
          <Col sm={9}>
            <Form.Control type="text" placeholder="Nome Completo" name="name" />
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
            <Form.Control as="select" name="state">
              <option value="">Selecione o estado</option>
              {/*  */}
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
            <Form.Control as="select" name="city">
              <option value="">Selecione a cidade</option>
              {/*  */}
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
            />
            <Form.Check
              inline
              name="emailPromotional"
              type="radio"
              id="emailPromotionalNo"
              value="N"
              label="Não"
              style={{ marginLeft: '15px' }}
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
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="doneBuy">
          <Col sm={12} className="text-center">
            <Button variant="success" type="submit">
              Finalizar Compra
            </Button>
          </Col>
        </Form.Group>
      </Form>
      <Modal show={true} onHide={false} data-testid="modal">
        <Modal.Header closeButton>
          <Modal.Title>Compra Finalizada com Sucesso!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Um e-mail de confirmação foi enviado com os detalhe da transação.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => {}}>
            Continuar
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={false} onHide={false} data-testid="modal">
        <Modal.Header closeButton>
          <Modal.Title>Erro ao finalizar a compra</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tente novamente.</Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={() => {}}>
            Voltar
          </Button>
        </Modal.Footer>
      </Modal>
    </Jumbotron>
  )
}

export { CheckOut }
