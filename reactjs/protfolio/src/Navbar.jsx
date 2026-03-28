import React from 'react'

function Navbar() {
  return (
    <div>
        <div className="flex justify-between align-center  p-10 sticky top-0">
               <div className="logo-div">
                    <span className='text-3xl font-bold text-purple-700'> MyProtfolio</span>
               </div>
                <div className="  w-100 flex gap-15 ">
                <div className='hover:text-purple-700 hover:bg-gray-200 hover:rounded px-2'><a className='hover:text-purple-700' href="#hero">Home</a></div>
                <div className='hover:text-purple-700'><a href="#project">Project</a></div>
                <div className='hover:text-purple-700'><a href="#about">About</a></div>
                <div className='hover:text-purple-700'><a href="#contact">Contact</a></div>
        </div>
        </div>
    </div>
  )
}

export default Navbar