import React from 'react'
import { TaskManager } from './pages/TaskManager'
import { BrowserRouter as Router } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <Router>
      <TaskManager />
    </Router>
  )
}

export default App
