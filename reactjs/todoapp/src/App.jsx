import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css';
import Fruits from './Components/Fruits'
import Todo from './Components/Todo';
import Home from './Components/Home';
import Product from './Components/Product';
import Post from './Components/Post';
import { QueryClientProvider,QueryClient } from '@tanstack/react-query';
import Parent from './Components/Parent';
import { ThemeProvider } from 'react-bootstrap';
import NewCount from './Components/NewCount';
import EmployeeData from './Components/EmployeeData';
import PostCreate from './Components/PostCreate';
import PostView from './Components/PostView';

function App() {
  const [count, setCount] = useState(0)
  
  const queryClient = new QueryClient()


  return (
    <>
      <div>
         {/* <Todo /> */}
         {/* <Home/> */}
         {/* <Product /> */}
        {/* <QueryClientProvider client={queryClient}>
          <Post />
        </QueryClientProvider> */}
{/*         
             <Parent/> */}
             {/* <NewCount/> */}
             {/* <EmployeeData /> */}
             <PostCreate/>
             <PostView/>
     
       
      </div>
     
    
   
    </>
  )
}

export default App
