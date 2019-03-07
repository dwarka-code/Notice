import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import RegisterContainer from './components/RegisterContainer'
import Admin from './components/Admin'
import TaskPage from './components/TaskPage'
import AddTask from './components/AddTask'
import EditTask from './components/EditTask'
import LoginContainer from './components/LoginContainer'
import GuestsPage from './components/GuestsPage'
import AddGuest from './components/AddGuest'
import AddTable from './components/AddTable'
import Statistics from './components/Statistics'

class App extends Component {


//exact face ca Home sa nu fie inclus in toate celelalte pagini

  render() {
 
    return (

     
      <BrowserRouter>

        <div style={{height: '100%'}}>

          <Switch>
            <Route exact path="/" component={LoginContainer}/>
            <Route exact path="/register" component={RegisterContainer}/>
            <Route exact path="/admin" component={Admin}/>
            <Route exact path="/task" component={TaskPage} />
            <Route exact path="/guests" component={GuestsPage} />
            <Route exact path="/guests/addguest" component={AddGuest} />
            <Route exact path="/guests/addtable" component={AddTable} />
            <Route exact path="/task/addtask" component={AddTask} />
            <Route exact path="/Statistics" component={Statistics} />
            <Route exact path="/task/edit/:id" component={EditTask} />

          </Switch>
        </div>

      </BrowserRouter>
    )
  }
}

export default App;
