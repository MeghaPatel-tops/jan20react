import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Index from './Products/Index'
import Categorycreate from './Category/Categorycreate'
import CategoryView from './Category/CategoryView'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CategoryEdit from './Category/CategoryEdit'


function Adminindex() {
   
  return (
    <div className='bg-gray-100'>
        <div class="flex h-screen">

 
  <aside class="w-64 bg-gray-800 text-white flex flex-col">
    <h2 class="text-2xl font-bold p-4 border-b border-gray-700">Ecom Dashboard</h2>
    
    <nav class="flex-1 p-4 space-y-2">
      <button  onclick={()=>{
        showTab('category')
      }} class="tab-btn w-full text-left p-2 rounded hover:bg-gray-700">Category</button>
      <button onclick={()=>{
        showTab('products')
      }} class="tab-btn w-full text-left p-2 rounded hover:bg-gray-700">Products</button>
      <button onclick={()=>{
        showTab('users')
      }} class="tab-btn w-full text-left p-2 rounded hover:bg-gray-700">Users</button>
    </nav>
  </aside>

 
  <main class="flex-1 p-6">
            <ToastContainer autoClose={2000} />

     <Routes>
         <Route path='product' element={<Index/>}></Route>
         <Route path='category/create' element={<Categorycreate />}></Route>
         <Route path='category' element={<CategoryView />}></Route>
          <Route path='category/edit/:id' element={<CategoryEdit />}></Route>
     </Routes>

  </main>

</div>
    </div>
  )
}

export default Adminindex