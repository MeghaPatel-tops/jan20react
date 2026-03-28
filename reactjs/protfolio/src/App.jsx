import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Navbar'
import Hero from './Hero'
import About from './About'
import Project from './Project'
// import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <Navbar />
      <Hero />
      <About/>
      <Project />
    </>
  )
}

export default App
