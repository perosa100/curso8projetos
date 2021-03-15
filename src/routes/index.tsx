import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { TaskList } from '../components/TaskList'
import { TaskRegister } from '../components/TaskRegister'
import { TaskUpdate } from '../components/TaskUpdate'

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={TaskList} />
      <Route path="/register" exact component={TaskRegister} />
      <Route path="/update/:id" exact component={TaskUpdate} />
    </Switch>
  )
}

export default Routes
