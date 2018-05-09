import React, {Component} from 'react';

import Navbar from './layout/Navbar';
import '../style/app.css';

class App extends Component{
  render(){
    return(
      <div className="App">
        <Navbar />
      </div>
    )
  }
}

export default App;
