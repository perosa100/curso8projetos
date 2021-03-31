import React, { useEffect, useState } from 'react'
import api from '../../api/api'

const ListStates: React.FC = () => {
  const [states, setStates] = useState([])
  const [loadingState, setLoadingState] = useState(true)
 

  const loadState = async () => {
    try {
      const result = await api.get('mini-ecommerces/states')
      setStates(result.data.estados)
      setLoadingState(false)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (loadingState) {
      loadState()
    }
  }, [loadingState])

  return (
    <>
      {states.map((state) => (
        <option value={state.sigla} key={state.sigla}>
          {state.nome}
        </option>
      ))}
    </>
  )
}

export { ListStates }
