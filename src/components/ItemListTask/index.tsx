import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import './styles.css'

export type PropsItemListTask = {
  tasks: {
    id: number
    name: string
    done: boolean
  }[]
  LoadingTasks: (arg: boolean) => void
}

const ItemListTask = ({ tasks, LoadingTasks }: PropsItemListTask) => {
  const markConlusition = (task: any) => {
    return task.done ? 'line-through' : 'none'
  }

  return (
    <>
      {tasks.map((task) => (
        <tr key={task.id} data-testid="tarefa">
          <td
            width="75%"
            data-testid="nome-tarefa"
            style={{ textDecoration: markConlusition(task) }}
          >
            {task.name}
          </td>
          <td className="text-right" data-testid="nome-tarefa">
            <Link
              to={`/update/${task.id}`}
              className={task.done ? 'hidden' : 'btn btn-warning btn-sm'}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Link>
          </td>
        </tr>
      ))}
    </>
  )
}

export { ItemListTask }
