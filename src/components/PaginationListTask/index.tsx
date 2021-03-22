import Pagination from 'react-bootstrap/Pagination'

interface PaginationListTaskProps {
  totalPages: number
  itemsForPage: number
  pageActual: number
  changePage: (arg: number) => void
}

function PaginationListTask({
  totalPages,
  itemsForPage,
  pageActual,
  changePage
}: PaginationListTaskProps) {
  const generateFirstItem = () => {
    return (
      <Pagination.First
        key="pagFirst"
        onClick={() => changePage(1)}
        disabled={pageActual === 1}
      />
    )
  }

  const generateItemPrevious = () => {
    return (
      <Pagination.Prev
        key="pagPrev"
        onClick={() => changePage(pageActual - 1)}
        disabled={pageActual === 1}
      />
    )
  }
  const generateItemNumber = (page: number) => {
    return (
      <Pagination.Item
        key={page}
        active={page === pageActual}
        onClick={() => changePage(page)}
      >
        {page}
      </Pagination.Item>
    )
  }

  const generateNextItem = (numPages: number) => {
    return (
      <Pagination.Next
        key="pagNext"
        onClick={() => changePage(pageActual + 1)}
        disabled={pageActual === numPages}
      />
    )
  }

  const lastItem = (numPages: number) => {
    return (
      <Pagination.Last
        key="pagLast"
        onClick={() => changePage(numPages)}
        disabled={pageActual === numPages}
      />
    )
  }
  const getPagination = () => {
    const numPages = Math.ceil(totalPages / itemsForPage)
    let items = []
    items.push(generateFirstItem())
    items.push(generateItemPrevious())

    for (let page = 1; page <= numPages; page++) {
      items.push(generateItemNumber(page))
    }
    items.push(generateNextItem(numPages))
    items.push(lastItem(numPages))

    return items
  }
  return (
    <div>
      <Pagination data-testid="paginacao">{getPagination()}</Pagination>
    </div>
  )
}

export { PaginationListTask }
