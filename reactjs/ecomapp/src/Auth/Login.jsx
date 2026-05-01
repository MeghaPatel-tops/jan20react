import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser,clearMsg, loginUser } from "../Redux/UserStore";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const {userMsg,userLoader,userError}= useSelector((state)=>state.users)
const navigate = useNavigate();
  
   
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    alert('here')
    e.preventDefault();

    

    console.log("Form Data:", form);

    // 👉 call API here
    dispatch(loginUser(form))

    setTimeout(()=>{
        navigate('/')
    },2000)
  };

   useEffect(() => {
          if (userMsg) {
            alert(userMsg)
            toast.success(userMsg); // show toast
      
            dispatch(clearMsg()); // clear तुरंत after showing
          }
          if(userError){
            alert(userError)
              toast.error(userError)
          }
        }, [userMsg,userError,dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        
        <h2 className="text-2xl font-bold mb-6 text-center">
         Login Form
        </h2>

        {userError && (
          <p className="text-red-500 mb-4 text-sm">{userError}</p>
        )}

         {userMsg && (
          <p className="text-green-500 mb-4 text-sm">{userMsg}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" method="post">

        

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

        
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
           For First time 
          <NavLink to={'/registration'} className="text-blue-600 hover:underline">
            Register
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;