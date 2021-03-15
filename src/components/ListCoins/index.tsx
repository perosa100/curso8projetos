import React from 'react'

type CoinsProps = {
  sigla: string
  descricao: string
}

const coins = [
  { sigla: 'USD', descricao: 'United States Dollar' },
  { sigla: 'UYU', descricao: 'Uruguayan Peso' },
  { sigla: 'UZS', descricao: 'Uzbekistan Som' },
  { sigla: 'BRL', descricao: 'Brazilian Real' },
  { sigla: 'PYG', descricao: 'Paraguayan Guarani' },
  { sigla: 'EUR', descricao: 'Euro' }
]

const ListCoins = () => {
  const compare = (coins1: CoinsProps, coins2: CoinsProps) => {
    if (coins1.descricao < coins2.descricao) {
      return -1
    } else if (coins1.descricao > coins2.descricao) {
      return 1
    }
    return 0
  }

  return (
    <>
      {coins.sort(compare).map((coin) => (
        <option value={coin.sigla} key={coin.sigla}>
          {coin.descricao}
        </option>
      ))}
    </>
  )
}
export { ListCoins }
