import React from 'react'
import ReactDom from 'react-dom'
import { CurrencyConverter } from '.'
import { render, fireEvent } from '@testing-library/react'
import axios from 'axios'
import '@testing-library/jest-dom/extend-expect'
jest.mock('axios')

const axiosMock = axios as jest.Mocked<typeof axios>

describe('Test CurrencyConverter', () => {
  jest.mock('axios')
  it('deve renderizar componente sem erro', () => {
    const div = document.createElement('div')
    ReactDom.render(<CurrencyConverter />, div)
    ReactDom.unmountComponentAtNode(div)
  })

  it('deve simular uma conversao de moedas', async () => {
    const { findByTestId, getByTestId } = render(<CurrencyConverter />)
    axiosMock.get.mockResolvedValueOnce({
      data: { success: true, rates: { USD: 4.564292, BRL: 1.101049 } }
    })
    fireEvent.click(getByTestId('btn-convert'))
    const modal = await findByTestId('modal')
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
    expect(modal).toHaveTextContent('1 USD = 0.24 BRL')
  })
})
