import React, { useMemo, useState } from 'react'
import  employees  from './Employee'
function EmployeeData() {
  const [str,setStr]= useState('');

  const handleChange = (e)=>{
       setStr(e.target.value);
      
   }
    
  const MemoData = useMemo(()=>{
      let filterArray;
       if(str!=''){
            filterArray = employees.filter((index)=>{
              if(index.name.toLowerCase() .includes(str.toLowerCase())){
                  return index
              }
        })
       }
       else{
           filterArray= employees;
       }
        return filterArray
  },[str])

  return (
    <div>
        <div className="container mt-5 border-1">
             <div className="row">
              <div className="col-4">
              <input type="text" class="form-control" placeholder="Search here..." onChange={handleChange}/>
             </div>
             </div>
        </div>
        <div className="container m-5">
             <table class="table table-bordered table-striped table-hover">
        <thead class="table-dark text-center">
            <tr>
                <th>Sr No</th>
                <th>Employee Name</th>
                <th>Department</th>
                <th>Salary (₹)</th>
            </tr>
        </thead>
        <tbody>
              {
                MemoData && MemoData.map((index,i)=>(
                     <tr key={i}>
                      <td>{i+1}</td>
                      <td>{index.name}</td>
                      <td>{index.department}</td>
                      <td>{index.salary}</td>
                     </tr>
                ))
              }
        </tbody>
</table>
        </div>
    </div>
  )
}

export default EmployeeData