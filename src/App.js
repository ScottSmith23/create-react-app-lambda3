import React from 'react';
import Game from './components/Game';
import Descrip from './components/Descrip';
import Rules from './components/Rules';
import './App.css';


function App() {
  return (
    <div className="App">
      <h1 style={{color:"palegoldenrod"}}>Conway's Game of Life</h1>
      <div className="topHalf">
      <div className="gameDiv">
      <Game />
      </div>
      <div className="ruleDiv">
        <Rules />
      </div>
      </div>
      <div className="descripDiv">
        <Descrip />
      </div>
    </div>

  );
}

export default App;
