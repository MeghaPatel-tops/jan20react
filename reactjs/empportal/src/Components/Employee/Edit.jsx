import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function Edit() {
    const [emp,setEmp]= useState([])
    const empid = useParams().id;
    const navigate = useNavigate();

    const getEmpById=async()=>{
        try {
            const res = await axios.get('http://localhost:3000/employee/'+empid);
            console.log(res);
            if(res){
                setEmp(res.data)
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    const handleChange = (e)=>{
        const{name,value}= e.target;
        setEmp({
            ...emp,
            [name]:value
        })
    }
    const handleClick = async(e)=>{
        e.preventDefault();
          try {
             let res = await axios.put('http://localhost:3000/employee/'+ empid,emp);
             if(res){
                alert('Employee UpDated')
                navigate('/Employee')
             }
          } catch (error) {
              console.log(error);
              
          }
          
    }

    useEffect(()=>{
        getEmpById()
    },[])
  return (
    <div>
          <div class="min-h-screen flex items-center justify-center">

                <form class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-5" method='post'>
                    <h2 class="text-2xl font-bold text-center text-gray-700">Employee Registration</h2>


                    <div>
                        <label class="block mb-1 text-gray-600 font-semibold">Full Name</label>
                        <input type="text" placeholder="Enter name"
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" name='name' onChange={handleChange} value={emp.name ?? ''}/>
                    </div>

                   
                    <div>
                        <label class="block mb-1 text-gray-600 font-semibold">Designation</label>
                        <input type="text" placeholder="Enter designation"
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" name='desg' onChange={handleChange} value={emp.desg ?? ''}/>
                    </div>

                  
                    <div>
                        <label class="block mb-1 text-gray-600 font-semibold">Email</label>
                        <input type="email" placeholder="Enter email"
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" name='email' onChange={handleChange} value={emp.email ?? ''}/>
                    </div>

                   
                    <div>
                        <label class="block mb-1 text-gray-600 font-semibold">Experience (Years)</label>
                        <input type="number" min="0" placeholder="Enter experience"
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" name='exp' onChange={handleChange} value={emp.exp ?? ''}/>
                    </div>


                    <div>
                        <label class="block mb-1 text-gray-600 font-semibold">Profile Image</label>
                        <input type="text" accept="image/*"
                            class="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-400 outline-none" name='eimage' onChange={handleChange} value={emp.eimage ?? ''}/>
                    </div>


                    <button
                        class="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition" onClick={handleClick}>
                        Register
                    </button>
                </form>
            </div>
    </div>
  )
}

export default Edit