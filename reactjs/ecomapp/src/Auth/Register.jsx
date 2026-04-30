import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser,clearMsg } from "../Redux/UserStore";
import { toast } from "react-toastify";

function Register() {
  const dispatch = useDispatch();
  const {userMsg,userLoader,userError}= useSelector((state)=>state.users)

  
   
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setError("");

    console.log("Form Data:", form);

    // 👉 call API here
    dispatch(createUser(form))
  };

   useEffect(() => {
          if (userMsg) {
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
          Create Account
        </h2>

        {userError && (
          <p className="text-red-500 mb-4 text-sm">{userError}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" method="post">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

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

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;