import React from 'react';
import { Switch, BrowserRouter as Router , Route } from 'react-router-dom';
import './App.css';
import Home from './components/home';

function App() {
  return (
    <div className="App">
      <Router>
          <Route exact path="/" component={Home}/>
      </Router>
    </div>
  );
}

export default App;
