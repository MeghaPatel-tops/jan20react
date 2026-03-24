import React from 'react'

function About() {
  const username="Megha";
  return (
    <div>
        {/* <h2 style={{textAlign:"center",color:"Blue"}}>About</h2> */}
        <h2 className='head'>About</h2>
        <hr />
        <span>Welcome:{username}</span>
    </div>
  )
}

export default About