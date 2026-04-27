import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProducts,clearMsg } from '../../Redux/ProductStore';
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify";


function ProductView() {
   const {productLoader,productData,ProductError,productMsg}= useSelector((state)=>state.product);
    const dispatch = useDispatch()

    useEffect(()=>{
            dispatch(getProducts())
            console.log(productData);
            
    },[productMsg])

     useEffect(() => {
            if (productMsg) {
              toast.success(productMsg); // show toast
        
              dispatch(clearMsg()); // clear तुरंत after showing
            }
            if(ProductError){
                toast.error(ProductError)
            }
    }, [productMsg,ProductError]);

  return (
    <div>
 <div class="p-6 bg-gray-100 min-h-screen">
  <h2 class="text-2xl font-bold mb-4">Product List</h2>

  <NavLink to={'/admin/product/create'} className="bg-blue-400 text-white p-2 mb-10">Add new</NavLink>

  <div className='m-5'>
    {
         productMsg && <p>{productMsg}</p>
    }
  </div>

  <div class="overflow-x-auto bg-white shadow rounded-lg">
    <table class="min-w-full text-left border-collapse">
      
    
      <thead class="bg-gray-200">
        <tr>
          <th class="px-6 py-3 text-sm font-semibold text-gray-700">#</th>
          <th class="px-6 py-3 text-sm font-semibold text-gray-700">Image</th>
          <th class="px-6 py-3 text-sm font-semibold text-gray-700">Product Name</th>
          <th class="px-6 py-3 text-sm font-semibold text-gray-700">Category Name</th>
          <th class="px-6 py-3 text-sm font-semibold text-gray-700">Description</th>
          <th class="px-6 py-3 text-sm font-semibold text-gray-700">Price</th>
          <th class="px-6 py-3 text-sm font-semibold text-gray-700" colSpan={2}>Action</th>
        </tr>
      </thead>

      
      <tbody class="divide-y">
        
       {
           productData && productData.map((index,i)=>(
               <tr class="hover:bg-gray-50" key={i}>
                   <td class="px-6 py-4">{i+1}</td>
                  
                   <td class="px-6 py-4">
                       <img src={`http://127.0.0.1:8000/storage/${index.pimage}`}  class="w-12 h-12 rounded object-cover" />
                   </td>
                   <td class="px-6 py-4">{index.name}</td>
                   <td class="px-6 py-4">{index.category.catname}</td>
                   <td class="px-6 py-4">{index.description}</td>
                   <td class="px-6 py-4">{index.price}</td>
                   <td><button onClick={()=>{
                        dispatch(deleteProduct(index.id))
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

export default ProductView