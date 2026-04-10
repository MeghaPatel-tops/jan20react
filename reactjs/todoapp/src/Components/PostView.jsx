import React, { useEffect, useState } from 'react'

function PostView() {
    const [postArray, setPostArray] = useState([])
    const [id,setId]=useState(-1)

    useEffect(() => {
        let array = localStorage.getItem('postarray');
        array = JSON.parse(array)
        
        setPostArray(array)
    },[id])

    const deletePost =(id)=>{
        console.log(id);
        
        let newArray = postArray.filter((index,i)=>{
              if(i!=id){
                  return index
              }
        })
        //.log(newArray);
        localStorage.setItem('postarray',JSON.stringify(newArray))
        setId(0)
        
    }

    return (
        <div>
            <div className="container m-5">
                <table class="table table-bordered table-striped table-hover">
                    <thead class="table-dark text-center">
                        <tr>
                            
                            <th>Title</th>
                            <th>Description</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           postArray&& postArray.map((index,i)=>(
                               <tr key={i}>
                                <td>{index.title}</td>
                                <td>{index.description}</td>
                                <td><img src={index.pimage} alt="" height={"100px"}/></td>
                                <td><div className="btn btn-danger" onClick={()=>{
                                    deletePost(i)
                                }}>Delete</div></td>
                                <td>
                                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                    Launch demo modal
                                    </button>
                                </td>
                               </tr>
                           ))  
                        }
                    </tbody>
                </table>
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
        </div>
    )
}

export default PostView