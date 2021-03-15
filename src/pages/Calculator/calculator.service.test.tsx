import React from 'react'
import ReactDom from 'react-dom'
import CalculatorService from './calculador.service'

describe('Test CalculatorService', () => {
  const [calc, concatNumber] = CalculatorService()

  it('deve garantir que 1 + 4 =  5', () => {
    let soma = calc(1, 4, '+')
    expect(soma).toEqual(5)
  })

  it('deve garantir que 1 - 4 = -3', () => {
    let sub = calc(1, 4, '-')
    expect(sub).toEqual(-3)
  })

  it('deve garantir que 1 * 4 = 4', () => {
    let mult = calc(1, 4, '*')
    expect(mult).toEqual(4)
  })

  it('deve garantir que 1 / 4 = 0.25', () => {
    let div = calc(1, 4, '/')
    expect(div).toEqual(0.25)
  })

  it('deve retornar 0 para operacao invalida', () => {
    let opInvalid = calc(1, 4, '%')
    expect(opInvalid).toEqual(0)
  })
})
