import React from 'react'

function Hero() {
  return (
    <div id="hero">
        <div className="p-10 bg-gradient-to-r from-white-600 to-violet-400 rounded flex gap-5">
             <div className="text  flex flex-col justify-between h-150 ">
                 <div>
                     <h2 className='text-5xl/15 text-900 '>Hello, I am
                    <br />
                    John Abraham
                  </h2>
                  <p className='mb-10'>I'm a Freelance UI/UX Designer and Developer based in London, England.<br></br> I strives to build immersive and beautiful web applications through carefully crafted code and user-centric design.</p>
                 <div className="div"> <button className='px-7 py-2 bg-purple-700 text-white rounded'>Say,Hello</button></div>
                 </div>
                <div className="flex justify-self-end gap-5">
                    <div className="bg-gray-300 w-full text-center p-10">
                        <span className='text-2xl'>15 Y.</span>
                        <br />
                        <span>Experience</span>
                    </div>
                     <div className="bg-gray-300 w-full text-center p-10">
                        <span className='text-2xl'>15 Y.</span>
                        <br />
                        <span>Experience</span>
                    </div>
                     <div className="bg-gray-300 w-full text-center p-10">
                        <span className='text-2xl'>15 Y.</span>
                        <br />
                        <span>Experience</span>
                    </div>
                </div>

             </div>
             <div className="img  bg-white p-20 rounded-xl shadow-2xl">
                    <img src="https://themewagon.github.io/picto/assets/person-CqOZwXV1.png" alt="" className='w-100 h-100'/>
             </div>
        </div>
    </div>
  )
}

export default Hero