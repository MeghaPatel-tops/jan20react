import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, getCategoryById, getCategory } from '../../Redux/CategoryStore';
import { useNavigate } from 'react-router-dom';
import { createProduct,clearMsg } from '../../Redux/ProductStore';
import { toast } from "react-toastify";



function ProductCreate() {
    const [product,setProduct]=useState({})
    const dispatch = useDispatch();
    const { productLoader,productMsg,ProductError}= useSelector((state)=>state.product)
    const navigate = useNavigate();
    const {categoryData} =useSelector((state)=>state.category)

  
    const handleChange = (e)=>{
        const {name,value,files} = e.target;
        if(name=='pimage'){
            setProduct({
                ...product,
                pimage:files[0]
            })
        }
        else{
            setProduct({
                ...product,
                [name]:value
            })
        }
    }

    useEffect(()=>{
         dispatch(getCategory());
    },[])

    const handleSubmit = async(e)=>{
          e.preventDefault();
        console.log(product);
         dispatch(createProduct(product))
        setTimeout(() => {
           dispatch(clearMsg());
          navigate('/admin/product')
        }, 2000);

    }

    
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
      
         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
         <div>
           {
            productLoader && <p>Loading...</p>
           
          }
         
         </div>
      <form method='post'
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Product
        </h2>

       <div class="mb-4">
            <label class="block mb-2 text-sm font-medium text-gray-700">
                Select Category
            </label>

            <select class="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" name="category_id" onChange={handleChange}>
                <option value="">Choose an option</option>
                  {
                    categoryData.map((index,i)=>(
                         <option value={index.id}>{index.catname}</option>
                    ))
                  }
            </select>
            </div>
       
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-medium">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            // value={category.catname}
            onChange={handleChange}
            placeholder="Enter category name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-medium">
            Product Price
          </label>
          <input
            type="text"
            name="price"
            // value={category.catname}
            onChange={handleChange}
            placeholder="Enter category name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-medium">
            Product Description
          </label>
          <input
            type="text"
            name="description"
            // value={category.catname}
            onChange={handleChange}
            placeholder="Enter category name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-700 font-medium">
            Category Image
          </label>
          <input
            type="file"
            name="pimage"
            accept="image/*"
            onChange={handleChange}
            className="w-full border p-2 rounded-lg bg-gray-50"
            required
          />
        </div>

        {/* Preview */}
        {/* {category.image && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(category.image)}
              alt="preview"
              className="w-full h-40 object-cover rounded-lg"
            />
          </div>
        )} */}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Category
        </button>
      </form>
    </div>
    </div>
  )
}

export default ProductCreate