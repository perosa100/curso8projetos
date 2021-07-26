import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { TaskList } from 'components/TaskList'
import { TaskRegister } from 'components/TaskRegister'
import { TaskUpdate } from 'components/TaskUpdate'
import { MiniEcommerce } from 'pages/MiniEcommerce'
import { Upload } from 'pages/Upload'
import Calculator from 'pages/Calculator/Calculator'

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={TaskList} />
      <Route path="/register" exact component={TaskRegister} />
      <Route path="/update/:id" exact component={TaskUpdate} />
      <Route path="/ecommerce" exact component={MiniEcommerce} />
      <Route path="/upload" exact component={Upload} />
      <Route path="/calculator" exact component={Calculator} />
    </Switch>
  )
}

export default Routes
