import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import RegisterContainer from './components/RegisterContainer'
import Navigation from './components/Navigation'
import Admin from './components/Admin'
import NoticePage from './components/NoticePage'
import AddNotice from './components/AddNotice'
import EditNotice from './components/EditNotice'
import NoticeDetails from './components/NoticeDetails'
import LoginContainer from './components/LoginContainer'
import EditUser from './components/EditUser'

class App extends Component {


//exact face ca Home sa nu fie inclus in toate celelalte pagini

  render() {
 
    return (

     
      <BrowserRouter>

      <div>

      <Navigation />
        <Switch>

          <Route exact path="/" component={LoginContainer}/>
          <Route exact path="/register" component={RegisterContainer}/>
          <Route exact path="/admin" component={Admin}/>
          <Route exact path="/notice" component={NoticePage} />
          <Route exact path="/notice/addnotice" component={AddNotice} />
          <Route exact path="/notice/edit/:id" component={EditNotice} />
          <Route exact path="/notice/:id" component={NoticeDetails} />
          <Route exact path="/admin/edit/:id" component={EditUser} />

        </Switch>


      </div>

      </BrowserRouter>
    )
  }
}

export default App;
