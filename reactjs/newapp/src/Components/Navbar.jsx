import React from 'react'

function Navbar(props) {
    const Items = props.navitems;
    console.log(Items);

    const styleobj={
         display: 'flex', 
          backgroundColor: 'lightblue'
    }
    const lisStyle={
        listStyle:"none",
         width: '150px',
          padding: '10px',
    }
    
  return (
    <div>
      <ul style={styleobj}>
          {
            Items.map((index,i)=>(
                <li style={lisStyle}>{index.toUpperCase()}</li>
            ))
        }
      </ul>
    </div>
  )
}

export default Navbar