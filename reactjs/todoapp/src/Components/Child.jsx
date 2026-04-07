import React from 'react'
import GrandChil from './GrandChil'

function Child(props) {
  return (
    <div>
        <GrandChil name={props.name}></GrandChil>
    </div>
  )
}

export default Child