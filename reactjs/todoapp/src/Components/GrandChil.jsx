import React, { useContext } from 'react'
import { ThemeContext } from './Theme';

function GrandChil(props) {
   
    const {theme,setTheme}= useContext(ThemeContext)

    const chnageTheme = ()=>{
        setTheme(
            theme=='light'?'dark':'light'
        )
    }
  return (
    <div>
        <h1>{props.name}</h1>
        <button style={{
            marginRight:'auto'
        }}  onClick={chnageTheme}>{theme =='light'?'Dark':'Light'}</button>
    </div>
  )
}

export default GrandChil