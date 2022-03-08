import React, { Component } from 'react';
import './App.css';

import Main from './components/MainComponent';
import { BrowserRouter } from 'react-router-dom';

// update lab 4.0
class App extends Component {

  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
        
        <Main />
      </div>
      </BrowserRouter>
    );
  }
};

export default App;
