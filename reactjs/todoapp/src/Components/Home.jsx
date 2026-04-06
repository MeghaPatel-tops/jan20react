import React, { useEffect, useState } from 'react'

function Home() {

    const [counter, setCounter] = useState(0);
    //===useEffect(() => { ... }) → Runs on every render.
    // useEffect(()=>{
    //     console.log('basic use effect')
    // })
    //=========================================================


    //=====useEffect(() => { ... }, []) → Runs once when mounted (like 
    // useEffect(()=>{
    //     console.log('basic use effect')
    // },[])
    //=========================================================


    //useEffect(() => { ... }, [dependency]) → Runs when the dependency 
    // useEffect(()=>{
    //     console.log('basic use effect')
    // },[counter])
    //=========================================================


    useEffect(()=>{
        let timer =  setInterval(()=>{
           
             console.log(timer);
             timer++;
           
        },1000);;

        return ()=>{
           clearInterval(timer)
        }


    },[])
    return (
        <div>
            <div className="container p-5">
                <fieldset>
                    <button onClick={() => {
                        setCounter(counter + 1)
                    }}>+</button>
                    <span>{counter}</span>
                    <button onClick={() => {
                        setCounter(counter - 1)
                    }}>-</button>
                </fieldset>
            </div>
        </div>
    )
}

export default Home