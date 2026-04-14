import React, { useState } from 'react'
import { addDoc, collection, query,where,getDocs } from 'firebase/firestore';
import db from '../../Firebase/db';
import { useNavigate } from 'react-router-dom';
function Login() {
    const [user,setUser] = useState({})

    const navigate = useNavigate()
     const handleChange= (e)=>{
        const {name,value}=e.target;
      
        setUser({
            ...user,
            [name]:value
        })
    }

    const handleClick = async(e)=>{
        console.log(user);
        
        e.preventDefault()
       try {
                const docRef = collection(db,'user_new');
                const q = query(docRef,where('email','==',user.email),where('pwd',"==",user.pwd));
                const quaerySnap = await getDocs(q);
                let userArray=[];
                console.log(quaerySnap);
                
                quaerySnap.forEach((doc)=>{
                    userArray.push({id:doc.id,...doc.data()})
                
                })
                console.log(userArray);
                if(userArray.length>0){
                    localStorage.setItem('loggedUser',JSON.stringify(userArray[0]))
                    alert('Login successfully');
                    navigate('/profile')
                }
                else{
                    alert('Login Fail')
                }
         

       } catch (error) {
            console.log(error);
            
       }
        
    }
  return (
    <div>
          <div class="min-h-screen flex items-center justify-center">

                <form class="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-5" method='post'>
                    <h2 class="text-2xl font-bold text-center text-gray-700">Login Form</h2>
                  
                   <div>
                        <label class="block mb-1 text-gray-600 font-semibold">Email</label>
                        <input type="email" placeholder="Enter email"
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" name='email' onChange={handleChange} />
                    </div>
                     <div>
                        <label class="block mb-1 text-gray-600 font-semibold">Password</label>
                        <input type="password" placeholder="Enter name"
                            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none" name='pwd' onChange={handleChange} />
                    </div>
                    

                    <button
                        class="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition" onClick={handleClick}>
                        Register
                    </button>
                </form>
            </div>
    </div>
  )
}

export default Login