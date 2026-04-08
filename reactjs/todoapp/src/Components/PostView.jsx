import React, { useEffect, useState } from 'react'

function PostView() {
    const [postArray, setPostArray] = useState([])

    useEffect(() => {
        let array = localStorage.getItem('postarray');
        array = JSON.parse(array)
        
        setPostArray(array)
    },[])

    return (
        <div>
            <div className="container m-5">
                <table class="table table-bordered table-striped table-hover">
                    <thead class="table-dark text-center">
                        <tr>
                            
                            <th>Title</th>
                            <th>Description</th>
                            <th>Image</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           postArray&& postArray.map((index,i)=>(
                               <tr key={i}>
                                <td>{index.title}</td>
                                <td>{index.description}</td>
                                <td><img src={index.pimage} alt="" height={"100px"}/></td>
                               </tr>
                           ))  
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PostView