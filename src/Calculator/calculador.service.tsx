const CalculatorService = () => {
  const cal = (numberOne: number, numberTwo: number, operator: string) => {
    let result

    switch (operator) {
      case '+':
        result = numberOne + numberTwo
        break
      case '-':
        result = numberOne - numberTwo
        break
      case '*':
        result = numberOne * numberTwo
        break
      case '/':
        result = numberOne / numberTwo
        break
      default:
        result = 0
        break
    }
    return result
  }

  const concatNumber = (numActual: string, numCat: string) => {
    if (numActual === '0' || numActual === null) {
      numActual = ''
    }
    if (numCat === '.' && numActual === '') {
      numActual = '0.'
    }
    if (numCat === '.' && numActual.indexOf('.') > -1) {
      return numActual
    }

    return numActual + numCat
  }

  return [cal, concatNumber]
}

export default CalculatorService
