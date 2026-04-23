import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createCategory,clearMsg, getCategoryById } from '../../Redux/CategoryStore';
import { useNavigate } from 'react-router-dom';

function Categorycreate() {
    const [category,setCategory]=useState({})
    const dispatch = useDispatch();
    const {isloading,error,msg,singleCategory}= useSelector((state)=>state.category)
    const navigate = useNavigate();

  
    const handleChange = (e)=>{
        const {name,value,files} = e.target;
        if(name=='image'){
            setCategory({
                ...category,
                catimage:files[0]
            })
        }
        else{
            setCategory({
                ...category,
                [name]:value
            })
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
         dispatch(createCategory(category))
        setTimeout(() => {
           dispatch(clearMsg());
          navigate('/admin/category')
        }, 2000);
    }
  return (
    <div>
      
         <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
         <div>
           {
            isloading && <p>Loading...</p>
           
          }{
             msg && <p>{msg}</p>
          }
          {
            error && <p>{error}</p>
          }
         </div>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Category
        </h2>

        {/* Category Name */}
        <div className="mb-4">
          <label className="block mb-2 text-gray-700 font-medium">
            Category Name
          </label>
          <input
            type="text"
            name="catname"
            value={category.catname}
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
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border p-2 rounded-lg bg-gray-50"
            required
          />
        </div>

        {/* Preview */}
        {category.image && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(category.image)}
              alt="preview"
              className="w-full h-40 object-cover rounded-lg"
            />
          </div>
        )}

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

export default Categorycreate