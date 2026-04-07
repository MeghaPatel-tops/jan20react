import React, { useContext } from 'react'
import Child from './Child'
import { ThemeContext } from './Theme'

function Parent() {
    const {theme,setTheme} = useContext(ThemeContext)
    
    const name="megha"
  return (
    <div style={{
        backgroundColor : (theme=='light')?'white':'black',
        color:(theme=='light')?'black':'white'
    }}>
        <p>Parent class compamenet</p>
        <Child name={name}/>
    </div>
  )
}

export default Parent