import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { decre, incre } from './Redux/CounterSlice'

function App() {
  const [count, setCount] = useState(0)
  const {value}  = useSelector((state)=>state.Counter)
  const dispatch= useDispatch();

  return (
    <>
      <div>
          <button onClick={()=>{
            dispatch(incre())
          }}>+</button>
          {value}
          <button onClick={()=>{
            dispatch(decre())
          }}>-</button>
      </div>
    </>
  )
}

export default App
