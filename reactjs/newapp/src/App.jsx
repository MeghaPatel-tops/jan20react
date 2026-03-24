import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Home from './Components/Home'
import About from './Components/About'
import './Components/style.css'
import Navbar from './Components/Navbar'
import Counter from './Components/Counter'
import Hero from './Components/Hero'
import Contact from './Components/Contact'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const navItems=['Home','about','gallary','contact','Team'];

  return (
    <>
    <Navbar navitems={navItems}/>
        <h1 className='head'>Welcome to react app</h1>
        <Hero />
        <Home />
        <About />
        <Counter />
        <Contact />
      
    </>
  )
}

export default App
