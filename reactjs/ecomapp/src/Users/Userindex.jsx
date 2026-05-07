import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../Redux/CategoryStore';
import { getProducts } from '../Redux/ProductStore';
import { NavLink, useNavigate } from 'react-router-dom';

import { addtoCartFunction } from '../Redux/UserStore';


function Userindex() {
   const disptach = useDispatch();
   const {categoryData} = useSelector((state)=>state.category);
   const {productData} = useSelector((state)=>state.product);
   const [CategoryId,setCategoryId]=useState(0);
     const [visibleCount, setVisibleCount] = useState(8);
  const [userAuth,setUserAuth]= useState(null);
  const {userMsg,userError}=useSelector((state)=>state.users)
  const loadMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  function AddToCart(pid,price) {
   
    let UserInfo = localStorage.getItem('loggedUser');
    if(UserInfo){
        console.log(UserInfo);
        UserInfo= JSON.parse(UserInfo)
        const cartData = {
            'user_id':UserInfo.user.id,
            'product_id':pid,
            'quantity':1,
            'price':price
        }
    console.log(cartData);
    disptach(addtoCartFunction({cart:cartData,token:UserInfo.token}))
        setTimeout(()=>{
          
        },2000)
    }
    
}

  const navigate = useNavigate();
  const logoutFun = ()=>{
       localStorage.removeItem('loggedUser')
        navigate('/login')
  }

  useEffect(() => {
    let loggedUser = localStorage.getItem('loggedUser')? JSON.parse( localStorage.getItem('loggedUser')):null;

    console.log(loggedUser);
    setUserAuth(loggedUser)
    
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMore();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
   

   useEffect(()=>{
       console.log(userMsg);
       
   },[userMsg,userError]) 
   

   const categoryChange = (catid)=>{
        setCategoryId(catid)
   }

   const filterProdut = useMemo(()=>{
        if(CategoryId==0){
              return productData
        }
        else{
            let newArray = productData.filter((index)=>{
                  if(index.category_id == CategoryId){
                        return index
                  }
            })
           return newArray;
            
        }
   },[CategoryId,productData]) 

   useEffect(()=>{
       disptach(getCategory())
       disptach(getProducts())

       
   },[])
  return (
    <div>
         <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">MyShop</h1>
        <div className="space-x-4 flex">
          <a href="#" className="hover:underline">Home</a>
          {
            userAuth  ? 
            <div>
              <NavLink to={'/cart'} href="#" className="hover:underline"><i class="fa-solid fa-cart-arrow-down"></i></NavLink>
              <span>&nbsp;&nbsp;&nbsp;</span>
              <button onClick={logoutFun}   className="hover:underline">Logout</button>
            </div>
            
            :
            <NavLink  to={'/login'}  className="hover:underline">Login</NavLink>
          }
         
         
        
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar Categories */}
        <aside className="w-64 bg-white p-4 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Categories</h2>
          <ul>
            {categoryData && categoryData.map((cat) => (
              <li key={cat.id} className="mb-2 cursor-pointer hover:text-blue-600">
                  <button onClick={()=>{
                      categoryChange(cat.id)
                  }}> {cat.catname}</button>
              </li>
            ))}
            <li key={0} className="mb-2 cursor-pointer hover:text-blue-600">
                  <button onClick={()=>{
                      categoryChange(0)
                  }}> All</button>
              </li>
          </ul>
        </aside>

        {/* Products */}
        <main className="flex-1 p-6">
           {
            userMsg&& <p>{userMsg}</p>
          }
          {
            userError && <p>{userError}</p>
          }
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filterProdut && filterProdut.slice(0,visibleCount).map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
                <img src={`http://127.0.0.1:8000/storage/${product.pimage}`}  alt={product.name} className="w-full h-40 object-cover rounded" />
                <h3 className="mt-2 font-semibold">{product.name}</h3>
                <p className="text-gray-600">₹{product.price}</p>
                <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700" onClick={()=>{
                  AddToCart(product.id,product.price)
                }}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
    </div>
  )
}

export default Userindex