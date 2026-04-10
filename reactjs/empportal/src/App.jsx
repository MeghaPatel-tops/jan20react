import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { Route, Router, Routes } from 'react-router-dom'
import Home from './Home'
import Contact from './Contact'
import About from './About'
import Navbar from './Navbar'
import Create from './Components/Employee/Create'
import View from './Components/Employee/View'
import Edit from './Components/Employee/Edit'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          {/* <Navbar/> */}
          <Routes>
               <Route path='/'  element={<Home /> }></Route>
               <Route path='/about' element={<About />}></Route>
               <Route path='/contact' element={<Contact />}></Route>
               <Route path='/Employee/create' element={<Create/>}></Route>
               <Route path='/Employee' element={<View/>}></Route>
                <Route path='/Employee/edit/:id' element={<Edit/>}></Route>
          </Routes>
      </div>
    </>
  )
}

export default App
