import React, {Component} from 'react';
import {Router, Route } from 'react-router-dom';
import history from '../history';

import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Landing from './layout/Landing';
import Register from './auth/Register';
import Login from './auth/Login';
import '../style/app.css';

class App extends Component{
  render(){
    return(
      <Router history={history}>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
      </Router>
    )
  }
}

export default App;
