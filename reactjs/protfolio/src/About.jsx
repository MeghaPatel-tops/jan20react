import React from 'react'

function About() {
  return (
    <div id="about">
        <div className="my-20 p-20">
             <div className="flex gap-20">
                <div className="img-div w-full bg-blue-50 p-10 rounded-xl">
                    <img src="https://themewagon.github.io/picto/assets/person2-DvYIsw9m.png" alt="" className='h-100' />
                </div>
                <div className="text-div w-full h-100 flex flex-col justify-center gap-10">
                    <h2 className='text-5xl/15 text-900 '>I am Professional User
                        <br /> Experience Designer</h2>
                        <p>I design and develop services for customers specializing creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences.</p>
                        <p>I design and develop services for customers specializing creating stylish, modern websites, web services.</p>
                         <div className="div"> <button className='px-7 py-2 bg-purple-700 text-white rounded'>My Projects</button></div>
                        
                 </div>
                </div>
             </div>
        </div>
    
  )
}

export default About