import React from 'react'
import ReactDom from 'react-dom'
import Calculator from './Calculator'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
describe('Test Calculator', () => {
  it('deve renderizar componente sem erro', () => {
    const div = document.createElement('div')
    ReactDom.render(<Calculator />, div)
    ReactDom.unmountComponentAtNode(div)
  })

  it('deve limpar o componente sem erro', () => {
    const { getByTestId, getByText } = render(<Calculator />)
    fireEvent.click(getByText('2'))
    fireEvent.click(getByText('C'))

    expect(getByTestId('txtNumeros')).toHaveValue('0')
  })

  it('deve somar 2+3 e obter 5', () => {
    const { getByTestId, getByText } = render(<Calculator />)
    fireEvent.click(getByText('2'))
    fireEvent.click(getByText('+'))
    fireEvent.click(getByText('3'))
    fireEvent.click(getByText('='))

    expect(getByTestId('txtNumeros')).toHaveValue('5')
  })

  it('deve somar 5- 3 e obter 2', () => {
    const { getByTestId, getByText } = render(<Calculator />)
    fireEvent.click(getByText('5'))
    fireEvent.click(getByText('-'))
    fireEvent.click(getByText('3'))
    fireEvent.click(getByText('='))

    expect(getByTestId('txtNumeros')).toHaveValue('2')
  })

  it('deve dividir 6 / 3 e obter 2', () => {
    const { getByTestId, getByText } = render(<Calculator />)
    fireEvent.click(getByText('6'))
    fireEvent.click(getByText('/'))
    fireEvent.click(getByText('3'))
    fireEvent.click(getByText('='))

    expect(getByTestId('txtNumeros')).toHaveValue('2')
  })

  it('deve multiplicar 2 * 3 e obter 6', () => {
    const { getByTestId, getByText } = render(<Calculator />)
    fireEvent.click(getByText('2'))
    fireEvent.click(getByText('*'))
    fireEvent.click(getByText('3'))
    fireEvent.click(getByText('='))

    expect(getByTestId('txtNumeros')).toHaveValue('2')
  })
})
