import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { ItemListTask } from '../ItemListTask'

const TaskList = () => {
  const [tasks, setTask] = useState([])
  const [loadingTasks, setLoadingTasks] = useState(true)

  useEffect(() => {
    function getTasks() {
      const tasksDb = localStorage['task']
      let listTasks = tasksDb ? JSON.parse(tasksDb) : []
      setTask(listTasks)
    }

    if (loadingTasks) {
      getTasks()
      setLoadingTasks(false)
    }
  }, [loadingTasks])

  return (
    <div className="text-center">
      <h3>Tarefas a Fazer </h3>
      <Table striped bordered hover responsive data-testid="table">
        <thead>
          <tr>
            <th>Tarefa</th>
            <th>
              <Link
                to="/register"
                className="btn btn-success btn-sm"
                data-testid="btn-nova-tarefa"
              >
                <FontAwesomeIcon icon={faPlus} />
                &nbsp; Nova Tarefa
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          <ItemListTask tasks={tasks} LoadingTasks={setLoadingTasks} />
        </tbody>
      </Table>
    </div>
  )
}

export { TaskList }
