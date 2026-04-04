import React, { useEffect, useState } from 'react'

function Todo() {
    const [task,setTask] = useState("");
    const [edit,setEdit]= useState(null)

    const [todoArray,setTodoArray]= useState([]);

    const handleChange = (e)=>{
        let value = e.target.value;
        setTask(value)
    }

    const getTodoList=()=>{
        let tArray = localStorage.getItem('todolist');
        let newArray=JSON.parse(tArray) 
        setTodoArray(newArray)    
    }

    useEffect(()=>{
        getTodoList();
        
        
    },[task])


    
//to add task
    const handleClick = (e)=>{
        e.preventDefault();
        
        let TodoFound = localStorage.getItem('todolist');
        if(TodoFound){
            TodoFound= JSON.parse(TodoFound);
            TodoFound.push(task);
             localStorage.setItem('todolist',JSON.stringify(TodoFound))

        }
        else{
             localStorage.setItem('todolist',JSON.stringify([task]))
        }
       
        setTask('')
    }
// to delete task
const deleteTask= (id)=>{
    let tArray = localStorage.getItem('todolist');
    let newArray=JSON.parse(tArray) ;
    let filterArray = newArray.filter((index,i)=>{
            if(i!=id){
                return index
            }
    })
    localStorage.setItem('todolist',JSON.stringify(filterArray))
    getTodoList();
    
}
//Edit task Data
const editTask = (id)=>{
    setTask(todoArray[0])
    setEdit(id)
}
//update task Data
const handleUpdate=(e)=>{
    e.preventDefault();
     let tArray = localStorage.getItem('todolist');
    let newArray=JSON.parse(tArray) ;
    newArray[edit]=task;
    localStorage.setItem('todolist',JSON.stringify(newArray))
    getTodoList();
    setTask('')
    setEdit(null)
}
  return (
    <div className='bg-light'>
        <div class="container mt-5">
  <div className="card shadow-sm p-4" style={{maxWidth: '500px', margin: 'auto'}}>
    
    <h3 className="mb-4 text-center">Add Task</h3>

    <form>
      <div className="mb-3">
        <label  className="form-label">Task Name</label>
        <input type="text" id="taskName" className="form-control" placeholder="Enter task name" onChange={handleChange} value={task} />
      </div>

      {
        (edit == null)?
        <button type="submit" className="btn btn-primary w-100" onClick={handleClick}>Add Task</button>
        :
        <button type="submit" className="btn btn-primary w-100" onClick={handleUpdate}>Update Task</button>
      }
    </form>

  </div>
</div>
<div class="container mt-5  p-5">
<table class="table table-bordered table-striped mt-4">
  <thead class="table-dark">
    <tr>
      <th scope="col">Sr No</th>
      <th scope="col">Task Name</th>
      <th scope="col" colSpan={2}>Action</th>
    </tr>
  </thead>

  <tbody>
         {
            todoArray && todoArray.map((index,i)=>(
                <tr key={i}>
                    <td>{i+1}</td>
                    <td>{index}</td>
                    <td><button className='btn btn-danger' onClick={()=>{
                        deleteTask(i)
                    }}>Delete</button></td>
                    <td>
                        <button className='btn btn-success'onClick={()=>{
                        editTask(i)
                    }}>Edit</button>
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

export default Todo