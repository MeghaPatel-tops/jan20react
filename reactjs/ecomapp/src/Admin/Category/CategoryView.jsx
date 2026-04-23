import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory, getCategory,clearMsg } from '../../Redux/CategoryStore';
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";


function CategoryView() {
    const {isloading,categoryData,error,msg}= useSelector((state)=>state.category);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch( getCategory())

   
    },[msg])

 useEffect(() => {
    if (msg) {
      toast.success(msg); // show toast

      dispatch(clearMsg()); // clear तुरंत after showing
    }
  }, [msg]);

  return (
    <div>
        <div class="p-6 bg-gray-100 min-h-screen">
  <h2 class="text-2xl font-bold mb-4">Category List</h2>

  <NavLink to={'/admin/category/create'} className="bg-blue-400 text-white p-2 mb-10">Add new</NavLink>

  <div className='m-5'>
    {
         msg && <p>{msg}</p>
    }
  </div>

  <div class="overflow-x-auto bg-white shadow rounded-lg">
    <table class="min-w-full text-left border-collapse">
      
    
      <thead class="bg-gray-200">
        <tr>
          <th class="px-6 py-3 text-sm font-semibold text-gray-700">#</th>
          <th class="px-6 py-3 text-sm font-semibold text-gray-700">Image</th>
          <th class="px-6 py-3 text-sm font-semibold text-gray-700">Category Name</th>
          <th class="px-6 py-3 text-sm font-semibold text-gray-700" colSpan={2}>Action</th>
        </tr>
      </thead>

      
      <tbody class="divide-y">
        
       {
           categoryData && categoryData.map((index,i)=>(
               <tr class="hover:bg-gray-50" key={i}>
                   <td class="px-6 py-4">{i+1}</td>
                  
                   <td class="px-6 py-4">
                       <img src={`http://127.0.0.1:8000/storage/${index.catimage}`}  class="w-12 h-12 rounded object-cover" />
                   </td>
                   <td class="px-6 py-4">{index.catname}</td>
                   <td><button onClick={()=>{
                        dispatch(deleteCategory(index.id))
                   }} className='bg-red-400 p-2 text-white'>Delete</button></td>
                   <td>
                        <NavLink to={'/admin/category/edit/'+index.id} className='bg-green-400 p-2 m-2 text-white'>Edit</NavLink>
                   </td>
               </tr>
           ))
       }
        

       
      

      </tbody>
    </table>
  </div>
</div>
    </div>
  )
}

export default CategoryView