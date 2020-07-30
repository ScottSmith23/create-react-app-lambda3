import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';
import {DropdownButton,Dropdown} from 'react-bootstrap';

import styled from "styled-components";
import '../styles/Game.css'

const DescripDiv = styled.div`

color:gainsboro;
`

const GenTitle = styled.h3`
font-family: 'Anton', sans-serif;

`

function Game() {

    const [running,setRunning] = useState(false);
    const runningRef = useRef(running);
    const [gridSize,setGridSize] = useState({numRows:25,numCols:25})
    const [genCount,setGenCount] = useState(0)
    const [cursorType,setCursorType] = useState("pixel")
    const [runSpeed,setRunSpeed] = useState(100)
    const [stepMode,setStepMode] = useState(false)
    runningRef.current = running;
    let count = 0;

    //Clears the Grid
    const clearGrid = () => {
        setGenCount(0)
        const rows = [];
 
        for (let i = 0;i<gridSize.numRows; i++){
            rows.push(Array.from(Array(gridSize.numCols), () => 0))

        }
        
        return rows;   

    }

    const [grid, setGrid] = useState(() =>{
        return clearGrid();
    });

    //Clears orange tiles
    const clearUsed = () => {
        
        const clearUsed = document.querySelectorAll(".box")
        
        for (let i = 0;i<clearUsed.length; i++){
            clearUsed[i].classList.remove("used")
    
        }
            
        }

    //fills a box at i,k coords
    const fillBox = (i,k,type) => {
        const shapes = {
            pixel: [[0,0]],
            glider: [[0,0],[1,1],[-1,0],[-1,1],[-1,2]],
            beacon: [[0,0],[-1,0],[-1,1],[2,2],[2,3],[1,3]],
            pentadec:[[0,0],[-1,1],[-2,1],[0,2],[1,1],[2,1],[3,1],[4,1],[5,0],[5,2],[6,1],[7,1]],
        }
        if(!running){
            const newGrid = produce(grid,gridCopy => {
                    let shape = shapes[type]
                    shape.forEach(([x,y]) => {
                        const newI = i + x;
                        const newK = k + y;
                        gridCopy[newI][newK] =  (grid[i][k] ? 0 : 1) 
                    })

            })
            setGrid(newGrid)
        }
        let used = document.getElementsByClassName(`${i}-${k}`)[0]
            used.classList.add("used")
        
    }
    //play+pause
    const playPause = () => {

        setRunning(!running);
        if (!running) {
        runningRef.current = true;
        gameStart();
        }
        
        
    }

    //step
    const oneStep = () => {
        setRunning(!running);
        if (!running) {
            runningRef.current = true;
            gameStart();
            }
            setRunning(false);
  
    }

    //randomize
    const randGen = () => {
        const rows = [];
        for (let i = 0;i<gridSize.numRows; i++){
            rows.push(Array.from(Array(gridSize.numCols), () => (Math.random() > 0.8 ? 1 : 0)))
        }
    
        setGrid(rows);  
    }

    //changeSize
    const changeGrid = (newRow,newCol) => {
        setRunning(false);
        setGrid(clearGrid());
        clearUsed();
        setGridSize({numRows:newRow,numCols:newCol});
        
        
    }


    //gamerunning logic
    const gameStart = useCallback(() => {
        if (!runningRef.current) {
          return;
        }

        const ops = [[0,1],[0,-1],[1,-1],[-1,1],[1,1],[-1,-1],[1,0],[-1,0]]

        setGrid(g => {
            return produce(g, gridCopy => {
                for (let i = 0; i < gridSize.numRows; i++) {
                    for (let j = 0; j < gridSize.numCols; j++){
                        let nb = 0;
                        ops.forEach(([x,y]) => {
                            const newI = i + x;
                            const newJ = j + y;
                            if (newI >= 0 && newI < gridSize.numRows && newJ >= 0 && newJ < gridSize.numCols){
                                nb += g[newI][newJ];
                            }
                        })
                        
                        if(nb < 2 || nb > 3){
                            gridCopy[i][j] = 0;
                        } else if (g[i][j] === 0 && nb === 3) {
                            gridCopy[i][j] = 1;
                            let used = document.getElementsByClassName(`${i}-${j}`)[0]
                            used.classList.add("used")
                        }
                    }
                }
            })
        })
        setGenCount(genCount => genCount + 1)
        setTimeout(gameStart,runSpeed);
        
    },[gridSize],[runSpeed])


  return (
      <>
            <DescripDiv>
    <GenTitle>Generations: {`${genCount}`}</GenTitle>
      </DescripDiv>
    <div className="gameGrid">
    <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${gridSize.numCols}, 20px)`
    }}>
      {grid.map((rows,i) => 
        rows.map((col,k) => 
        <div 
        className={`box ${i}-${k}`}
        key={`${i}-${k}`} 
        onMouseDown={()=> {fillBox(i,k,cursorType)}}
        style={{
            backgroundColor: grid[i][k] ? 'black' : undefined}} />))}
    </div>
    </div>
    <div className="buttonDiv">
    <button className='buttonStyle' onClick={() => {playPause()}}>
                {running ? 'Pause' : 'Start'}
    </button>
    <button className='buttonStyle' onClick={() => {
            setGrid(clearGrid());
            clearUsed();
        }}
      >Clear
    </button>
    <button className='buttonStyle' onClick={() => {oneStep();

        }}
      >Step
    </button>
    <button className='buttonStyle' onClick={() => {randGen()}}
      >Random
    </button>
    <DropdownButton id="dropdown-basic-button" title="Grid Size">
    <Dropdown.Item onClick={() => {changeGrid(25,25)}}>25x25</Dropdown.Item>
    <Dropdown.Item onClick={() => {changeGrid(32,32)}}>32x32</Dropdown.Item>
    <Dropdown.Item onClick={() => {changeGrid(48,48)}}>48x48</Dropdown.Item>
    </DropdownButton>
    <DropdownButton id="dropdown-basic-button" title="Preset">
    <Dropdown.Item onClick={() => {setCursorType("pixel")}}>Pixel</Dropdown.Item>
    <Dropdown.Item onClick={() => {setCursorType("glider")}}>Glider</Dropdown.Item>
    <Dropdown.Item onClick={() => {setCursorType("beacon")}}>Beacon</Dropdown.Item>
    <Dropdown.Item onClick={() => {setCursorType("pentadec")}}>PentaDec</Dropdown.Item>
    </DropdownButton>
    <DropdownButton id="dropdown-basic-button" title="Speed">
    <Dropdown.Item onClick={() => {setRunSpeed(100)}}>100</Dropdown.Item>
    <Dropdown.Item onClick={() => {setRunSpeed(500)}}>500</Dropdown.Item>
    <Dropdown.Item onClick={() => {setRunSpeed(1000)}}>1000</Dropdown.Item>
    </DropdownButton>
      </div>
    </>
  );
}

export default Game;
