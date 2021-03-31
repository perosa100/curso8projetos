import React, { useCallback, useEffect, useState } from 'react'
import api from '../../api/api'

type stateProps = {
  state: string
}

const ListCity = ({ state }: stateProps) => {
  const [citys, setCitys] = useState([])
  const [loadingState, setLoadingState] = useState(true)

  const loadState = useCallback(async () => {
    try {
      const result = await api.get(`/mini-ecommerces/${state}/cidades`)
      setCitys(result.data)
      setLoadingState(false)
    } catch (error) {
      setCitys([])
      console.log(error)
    }
  }, [state])

  useEffect(() => {
    if (loadingState && state !== '') {
      loadState()
    }
  }, [loadState, loadingState, state])

  return (
    <>
      {citys.map((city) => (
        <option value={city} key={city}>
          {city}
        </option>
      ))}
    </>
  )
}

export { ListCity }
