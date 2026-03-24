import React from 'react'
import styled from 'styled-components'

function Contact() {
   
    const Heading = styled.h2`
        font-size:3em;
        text-align:center;
    `
    const Button= styled.button`
        background-color:skyblue;
        color:white;
        padding:10px 20px;
        border:none;
        border-radius:20px;
        margin:20px 0px;

        &:hover{
         background-color:blue;
        }
    `

  return (
    <div>
        <Heading>Contact us</Heading>
        <Button>Contact us</Button>
    </div>
  )
}

export default Contact