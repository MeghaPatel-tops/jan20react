import React from 'react'

function Navbar(props) {
    const Items = props.navitems;
    console.log(Items);
    
  return (
    <div>
      <ul>
          {
            Items.map((index,i)=>(
                <li>{index.toUpperCase()}</li>
            ))
        }
      </ul>
    </div>
  )
}

export default Navbar