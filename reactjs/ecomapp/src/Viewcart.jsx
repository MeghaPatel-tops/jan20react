import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartFunction, updateCartFunction, viewCartFunction } from './Redux/UserStore';
import { NavLink } from 'react-router-dom';
import axios from 'axios';



function Viewcart() {
  const [userAuth, setUserAuth] = useState(null);
  const dispatch = useDispatch();
  const { cartData, cartTotal } = useSelector((state) => state.users)
  const [flag,setFlag]= useState(0)
  const logoutFun = () => {
    localStorage.removeItem('loggedUser')
    navigate('/login')
  }

  const handleChange = (cartid,qty) => {
   
    console.log(qty);
    console.log(cartid);
    dispatch(updateCartFunction({token: userAuth.token,data:{cart_id:cartid,quantity:qty}}))
    setFlag(flag+1)
  }

  const removeCart = (cartid) => {
   
  
    console.log(cartid);
    dispatch(deleteCartFunction({token:userAuth.token,cartid:cartid,user_id:userAuth.user.id}))
    setFlag(flag+1)
  }

   const handlePayment = async () => {

    // Create Order
    const res = await axios.post(
      "http://127.0.0.1:8000/api/create-order",
      {
        amount: 500
      },
      {
         headers:{
                   
                    Authorization: `Bearer ${userAuth.token}`,
      },
      }
    );

    console.log(res);
    
    const order = res.data;
    console.log(order);
    

    const options = {
      key: order.key,
      amount: order.amount,
      currency: order.currency,
      name: "My Shop",
      description: "Test Payment",
      order_id: order.order_id,

      handler: async function (response) {
        response['shipping_name']="Megha",
        response['shipping_email']="test@gmail.com"
        response['shipping_phone']="09090909"
        response['shipping_address']="101 main street surat"
          console.log(response);
    
        // Verify Payment
        const verify = await axios.post(
          "http://127.0.0.1:8000/api/verify-payment",
          response,
           {
         headers:{
                   
                    Authorization: `Bearer ${userAuth.token}`,
      },
      }
        );

        if (verify.data.success) {
          alert("Payment Success");
        } else {
          alert("Payment Failed");
        }
      },

      theme: {
        color: "#3399cc"
      }
    };

    const rzp = new window.Razorpay(options);

    rzp.open();
  };




  useEffect(() => {
    let UserInfo = localStorage.getItem('loggedUser');

    UserInfo = JSON.parse(UserInfo)


    dispatch(viewCartFunction({ token: UserInfo.token }))
    setUserAuth(UserInfo)

  }, [flag])
  return (
    <div>
      <div>
        <div className="bg-gray-100 min-h-screen">
          {/* Navbar */}
          <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">MyShop</h1>
            <div className="space-x-4 flex">
              <a href="#" className="hover:underline">Home</a>
              {
                userAuth ?
                  <div>
                    <NavLink to={'/cart'} href="#" className="hover:underline"><i class="fa-solid fa-cart-arrow-down"></i></NavLink>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <button onClick={logoutFun} className="hover:underline">Logout</button>
                  </div>

                  :
                  <NavLink to={'/login'} className="hover:underline">Login</NavLink>
              }



            </div>
          </nav>
          <div class="container mx-auto p-6">
            <h2 class="text-2xl font-bold mb-4">🛒 View Cart</h2>

            <div class="overflow-x-auto bg-white shadow-md rounded-lg">
              <table class="min-w-full text-left text-sm text-gray-600">


                <thead class="bg-gray-100 text-gray-700 uppercase text-xs">
                  <tr>
                    <th class="px-6 py-3">Product</th>
                    <th class="px-6 py-3">Image</th>
                    <th class="px-6 py-3">Price</th>
                    <th class="px-6 py-3">Quantity</th>
                    <th class="px-6 py-3">Total</th>
                    <th class="px-6 py-3 text-center">Action</th>
                  </tr>
                </thead>

                <tbody>

                  {
                    cartData && cartData.map((index, i) => (

                      <tr class="border-b hover:bg-gray-50">
                        <td class="px-6 py-4 font-medium text-gray-900">{index.product.name}</td>
                        <td class="px-6 py-4">

                          <img src={`http://127.0.0.1:8000/storage/${index.product.pimage}`} class="w-12 h-12 rounded object-cover" />

                        </td>
                        <td class="px-6 py-4">{index.product.price}</td>
                        <td class="px-6 py-4">
                          <input type="number" value={index.quantity} min="1"
                            class="w-16 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400" onChange={(e)=>{
                              handleChange(index.id,e.target.value)
                            }} />
                        </td>
                        <td class="px-6 py-4">{index.product.price * index.quantity}</td>
                        <td class="px-6 py-4 text-center">
                          <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={()=>{
                            removeCart(index.id)
                          }}>
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))
                  }




                </tbody>
              </table>
            </div>


            <div class="flex justify-end mt-6">
              <div class="bg-gray-100 p-4 rounded-lg shadow w-64">
                <p class="flex justify-between mb-2">
                  <span>Subtotal:</span> <span>{cartTotal}</span>
                </p>
                <p class="flex justify-between font-bold text-lg">
                  <span>Total:</span> <span>{cartTotal}</span>
                </p>

                <button class="w-full mt-4 bg-green-500 text-white py-2 rounded hover:bg-green-600" onClick={handlePayment}>
                  Checkout
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Viewcart