import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import Fruits from './Components/Fruits'
import Todo from './Components/Todo';

function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
      <div>
         <Todo />
      </div>
     
    
   
    </>
  )
}

export default App
