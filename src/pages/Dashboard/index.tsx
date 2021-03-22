import { useEffect, useState } from 'react'
import Chart from 'react-google-charts'
import './styles.css'
const Dashboard = () => {
  const title = 'Quantidade de Cadastro Primeiro Ano.'
  const [data, setData] = useState([
    ['Mês', 'Quantidade'],
    ['Janeiro', 33],
    ['Fevereiro', 23],
    ['Março', 17],
    ['Abril', 73],
    ['Maio', 24],
    ['Junho', 73],
    ['Julho', 24]
  ])

  useEffect(() => {
    const updateData = () => {
      const dataGraph = data.map((line) => {
        if (Number.isInteger(line[1])) {
          line[1] = Math.floor(Math.random() * 101)
        }
        return line
      })
      setData(dataGraph)
    }

    const idInterval = setInterval(() => updateData(), 5000)

    return () => {
      clearInterval(idInterval)
    }
  }, [data])

  const animation = { duration: 1000, easing: 'ease', startup: true }

  return (
    <div>
      <Chart
        width={'400px'}
        height={'400px'}
        chartType={'PieChart'}
        data={data}
        options={{ title: title }}
      />

      <Chart
        width={'400px'}
        height={'400px'}
        chartType={'PieChart'}
        data={data}
        options={{ title: title, is3D: true }}
      />

      <Chart
        width={'400px'}
        height={'400px'}
        chartType={'PieChart'}
        data={data}
        options={{ title: title, pieHole: 0.4 }}
      />

      <Chart
        width={'400px'}
        height={'400px'}
        chartType={'BarChart'}
        data={data}
        options={{
          title: title,
          charArea: { width: '50%' },
          hAxis: { title: 'Quantitade' },
          vAxis: { title: 'Mês' },
          animation
        }}
      />

      <Chart
        width={'400px'}
        height={'400px'}
        chartType={'LineChart'}
        data={data}
        options={{
          title: title,
          charArea: { width: '50%' },
          hAxis: { title: 'Quantitade' },
          vAxis: { title: 'Mês' },
          animation
        }}
      />

      <Chart
        width={'400px'}
        height={'400px'}
        chartType={'AreaChart'}
        data={data}
        options={{
          title: title,
          hAxis: { title: 'Quantitade' },
          vAxis: { title: 'Mês' },
          animation
        }}
      />
    </div>
  )
}
export { Dashboard }
