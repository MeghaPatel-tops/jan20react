import { useQuery } from '@tanstack/react-query'
import React from 'react'

function Post() {
    const {data,isPending,error}=useQuery({
        queryKey:['users'],
        queryFn:()=>fetch('https://fakestoreapi.com/users').then(r=>r.json())
    })
  return (
    <div>
        {
            isPending && <h1>Loading.....</h1>
        }
        {
            error && <p>{error.message}</p>
        }
        <ul>
            {
            data && data.map((index,i)=>(
                <li>{index.username}</li>
            ))
        }
        </ul>
    </div>
  )
}

export default Post