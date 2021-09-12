import React, { Component } from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import CreateReport from './components/CreateReport';
import EditReport from './components/EditReport';
import labHome from './components/labHome';
import NavBar from './components/labNavBar';


import ReportDetails from './components/ReportDetails';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>

        <div className="container">

        <NavBar/>
        <Route path="/labhome" exact component={labHome}></Route>
        <Route path="/add" component={CreateReport}></Route>
        <Route path="/edit/:id" component={EditReport}></Route>
        <Route path="/lab/:id" component={ReportDetails}></Route>


        </div>
      
      </BrowserRouter>
     
    )
  }
}