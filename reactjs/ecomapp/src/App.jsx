import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Adminindex from './Admin/Adminindex'
import { Route, Routes } from 'react-router-dom'
import Register from './Auth/Register'
import Userindex from './Users/Userindex'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       

       <Routes>
         <Route path='/' element={<Userindex/>}></Route>
           <Route path='/registration' element={<Register/>}></Route>
           <Route path='/admin/*' element={<Adminindex/>}></Route>
       </Routes>
    </>
  )
}

export default App
