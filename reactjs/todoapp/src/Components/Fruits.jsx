import React, { useState } from 'react'

function Fruits() {
    //const fruits=['apple','banana','mango''apple','banana','mango'];
    const [fruits,setFruits]=useState(['apple','banana','mango'])

    const addFruitsData = ()=>{
        let fruitName = prompt('Enter fruit name');
      
         setFruits(
            [
                ...fruits,
               fruitName 
            ]
         )
         
    }
    
  return (
    <div>
        <button onClick={addFruitsData}>Add Fruits</button>
       <ul>
        {
            fruits.map((index,i)=>(
                <li key={i}>{index}</li>
            ))
        }
       </ul>
    </div>
  )
}

export default Fruits