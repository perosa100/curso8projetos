import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'

interface OrdenationProps {
  orderAsc: boolean
  orderDesc: boolean
}

function Ordenation({ orderAsc, orderDesc }: OrdenationProps) {
  const handleAscDesc = () => {
    return orderAsc || orderDesc ? 'hidden' : ''
  }

  const handleAsc = () => {
    return orderAsc ? '' : 'hidden'
  }

  const handleDesc = () => {
    return orderDesc ? '' : 'hidden'
  }

  return (
    <span>
      <FontAwesomeIcon
        icon={faSort}
        className={handleAscDesc()}
        data-testid="faSort"
      />
      <FontAwesomeIcon
        icon={faSortUp}
        className={handleAsc()}
        data-testid="faSortUp"
      />
      <FontAwesomeIcon
        icon={faSortDown}
        className={handleDesc()}
        data-testid="faSortDown"
      />
    </span>
  )
}

export { Ordenation }
