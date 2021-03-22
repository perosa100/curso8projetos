import { Link } from 'react-router-dom'
import { Table, Form } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { ItemListTask } from '../ItemListTask'
import { PaginationListTask } from '../PaginationListTask'
import { Ordenation } from '../Ordenation'
import './styles.css'
import api from './../../api/api'

const TaskList = () => {
  const ITEM_FOR_PAGE = 3

  const [tasks, setTask] = useState([])
  const [loadingTasks, setLoadingTasks] = useState(true)
  const [totalPages, setTotalPages] = useState(0)
  const [pageActual, setPageActual] = useState(0)
  const [orderAsc, setOrderAsc] = useState(false)
  const [orderDesc, setOrderDesc] = useState(false)
  const [filterTask, setFilterTask] = useState('')

  useEffect(() => {
    const getTasks = async () => {
      let ordem = ''
      if (orderAsc) {
        ordem = 'ASC'
      } else if (orderDesc) {
        ordem = 'DESC'
      }
      api
        .get(
          `/manager-task?page=${pageActual}&ordem=${ordem}&filter=${filterTask}&itens-por-page=${ITEM_FOR_PAGE}`
        )
        .then((response: any) => {
          setTotalPages(response.data.totalPages)
          setTask(response.data.tasks)
        })
        .catch((error: any) => {
          console.log(error)
        })
    }
    if (loadingTasks) {
      getTasks()
      setLoadingTasks(false)
    }
  }, [loadingTasks, pageActual, orderAsc, orderDesc, filterTask])

  const handleChangePage = (page: number) => {
    setPageActual(page)
    setLoadingTasks(true)
  }

  const handleOrder = (event: any) => {
    event.preventDefault()

    if (!orderAsc && !orderDesc) {
      setOrderAsc(true)
      setOrderDesc(false)
    } else if (orderAsc) {
      setOrderAsc(false)
      setOrderDesc(true)
    } else {
      setOrderAsc(false)
      setOrderDesc(false)
    }
    setLoadingTasks(true)
  }

  const handleFiter = (event: any) => {
    setFilterTask(event.target.value)
    setLoadingTasks(true)
  }

  return (
    <div className="text-center">
      <h3>Tarefas a Fazer </h3>
      <Table striped bordered hover responsive data-testid="table">
        <thead>
          <tr>
            <th>
              <a href="/" onClick={handleOrder}>
                Tarefa &nbsp;
                <Ordenation orderAsc={orderAsc} orderDesc={orderDesc} />
              </a>
            </th>
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
          <tr>
            <th>
              <Form.Control
                type="text"
                value={filterTask}
                onChange={handleFiter}
                data-testid="txt-tarefa"
                className="filter-task"
              />
            </th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <ItemListTask tasks={tasks} LoadingTasks={setLoadingTasks} />
        </tbody>
      </Table>
      <PaginationListTask
        totalPages={totalPages}
        itemsForPage={ITEM_FOR_PAGE}
        pageActual={pageActual}
        changePage={handleChangePage}
      />
    </div>
  )
}

export { TaskList }
