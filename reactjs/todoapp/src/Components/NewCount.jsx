import React, { useEffect, useRef } from 'react'

function NewCount() {
    const count = useRef(0);
    const inputRef = useRef();
   
    useEffect(()=>{
         inputRef.current.focus();
    },[])
    
    
    const incre = ()=>{
          count.current = count.current+1
          console.log('incree',count.current);
          
    }
    const decre = ()=>{
          count.current = count.current-1
           console.log('decre',count.current);
    }
  return (
    <div>
        <button onClick={incre}>+</button>
        {count.current}
        <button onClick={decre}>-</button>
        <br />
        <input type="text" name="" id="" ref={inputRef}/>
    </div>
  )
}

export default NewCount