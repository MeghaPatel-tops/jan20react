import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';

function View() {
    const [employees, setEmpoyees] = useState([]);

    const getEmployee = async () => {
        try {
            let res = await axios.get('http://localhost:3000/employee');
            console.log(res.data);
            setEmpoyees(res.data)

        } catch (error) {
            console.log(error);

        }
    }

    const deleteEmp = async(id)=>{
          try {
              let res = await axios.delete('http://localhost:3000/employee/'+id);
              if(res){
                alert('Deleted!')
              }
          } catch (error) {
              console.log(error);
              
          }
    }

    useEffect(() => {
        getEmployee()
    }, [])
    return (
        <div>

            <div class="max-w-5xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
                <h2 class="text-2xl font-bold mb-4 text-gray-700">Employee List</h2>
                <div className=' flex justify-content-end'>
                    <NavLink className={'px-3 py-2 bg-blue-400 text-white rounded ml-auto'} to={'/Employee/create'}>Create New</NavLink >
                </div>

                <table class="w-full border-collapse mt-10">
                    <thead>
                        <tr class="bg-gray-200 text-left">
                            <th class="p-3 font-semibold text-gray-700 border">Image</th>
                            <th class="p-3 font-semibold text-gray-700 border">Name</th>
                            <th class="p-3 font-semibold text-gray-700 border">Designation</th>
                            <th class="p-3 font-semibold text-gray-700 border">Email</th>
                            <th class="p-3 font-semibold text-gray-700 border">Experience</th>
                            <th class="p-3 font-semibold text-gray-700 border"colSpan={2}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            employees && employees.map((index, i) => (
                                <tr class="hover:bg-gray-50">
                                    <td class="p-3 border">
                                        <img src={index.eimage} class="w-12 h-12 rounded-full object-cover" />
                                    </td>
                                    <td class="p-3 border">{index.name}</td>
                                    <td class="p-3 border">{index.desg}</td>
                                    <td class="p-3 border">{index.email}</td>
                                    <td class="p-3 border">{index.exp} Years</td>
                                    <td class="p-3 border">
                                        <button className='p-2 bg-red-500 text-white' onClick={()=>{
                                            deleteEmp(index.id)
                                        }}>Delete</button>
                                         <NavLink className='p-2 bg-green-500 text-white' to={'/Employee/edit/'+index.id}>Edit</NavLink>
                                    </td>
                                </tr>
                            ))
                        }




                       

                    </tbody>
                </table>

            </div>
        </div>
    )
}

export default View