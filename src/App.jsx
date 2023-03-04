import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './css/App.css'
import {Navbar, Nav, Button} from 'react-bootstrap';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <p>this is a test</p>
    </div>
  )
}

export default App
