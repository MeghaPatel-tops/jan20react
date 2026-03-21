import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './Components/Home'
import About from './Components/About'

import Navbar from './Components/Navbar'
import Counter from './Components/Counter'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const navItems=['Home','about','gallary','contact','Team'];

  return (
    <>
    <Navbar navitems={navItems}/>
        <h1>Welcome to react app</h1>
        <Home />
        <About />
        <Counter />
      
    </>
  )
}

export default App
