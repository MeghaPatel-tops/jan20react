import { doc, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import db from '../../Firebase/db';

function Profile() {
    const [user,setUser] = useState({});

    const handleChange = (e)=>{
         const {name,value}=e.target;
        setUser({
            ...user,
            [name]:value
        })
    }

    const handleSubmit = async(e)=>{
         e.preventDefault();
         try {

            const docRef = doc(db,'user_new',user.id)
            const res = await updateDoc(docRef,user);
            alert('Profile updated!')
            
         } catch (error) {
            console.log(error);
            
         }
    }

    useEffect(()=>{
        let loginUser = localStorage.getItem('loggedUser');
        loginUser = JSON.parse(loginUser)
        setUser(loginUser)
    },[])
  return (
    <div>
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          User Profile
        </h2>

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-3">
            {user ? (
              <img
                src={user.eimage}
                alt="preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="flex items-center justify-center h-full text-gray-400">
                No Image
              </span>
            )}
          </div>

          <input
            type="text"
           
            onChange={handleChange}
            className="text-sm"
            name='eimage'
            value={user.eimage}
          />
        </div>

        {/* Username */}
        <div>
          <label className="block mb-1 text-gray-600 font-semibold">
            Username
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter username"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={user.name ?? ''}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-gray-600 font-semibold">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={user.email ?? ''}
          />
        </div>

        {/* Contact */}
        <div>
          <label className="block mb-1 text-gray-600 font-semibold">
            Contact
          </label>
          <input
            type="tel"
            name="contact"
            placeholder="Enter contact number"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={user.contact ?? ''}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition"
        >
          Save Profile
        </button>
      </form>
    </div>

    </div>
  )
}

export default Profile