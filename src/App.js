import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';
import { useCallback, useEffect, useState } from 'react'

const Row = ({ children }) => {
  return <div className="row">
    {children}
  </div>
}

const Cell = ({ x, y, isSelected, setSelected, backgroundColor}) => {
  const classNames = `cell ${isSelected && 'selected'}`
  return <div
    className={classNames}
    style={{
      backgroundColor
    }}
    onClick={() => setSelected(x, y)}
  >
    <p>[{x}, {y}]</p>
  </div>
}

function App() {
  const n_rows = 20
  const n_cell = 20
  const [selected, setSelected] = useState({})
  const [tool, setTool] = useState('scanline')
  const onSelect = (x, y) => {
    for (let j = x; j < n_rows; j++) {
      for (let i = y; i < n_cell; i++) {
        setTimeout(()=>setSelected(selected => ({...selected, [j+100*i]:true})), 40*(i-y))
      }
    }
  }
  const renderRow = useCallback(() => {
    console.log("RENDER")
    let arr = []
    for (let x = 0; x < n_rows; x++) {
      let row = []
      for (let y = 0; y < n_cell; y++) {
        row.push(<Cell
          x={x}
          y={y}
          isSelected={selected[x + y * 100]}
          setSelected={onSelect}
          backgroundColor={'red'}
        />)
      }
      arr.push(<Row>
        {row}
      </Row>)
    }
    return arr
  }, [selected])

  return (
    <div className="App">
      <Row>
        <div>Run</div>
      </Row> 
      {renderRow()}
    </div>
  );
}

export default App;
