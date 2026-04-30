import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../Redux/CategoryStore';
import { getProducts } from '../Redux/ProductStore';
import { NavLink } from 'react-router-dom';

function Userindex() {
   const disptach = useDispatch();
   const {categoryData} = useSelector((state)=>state.category);
   const {productData} = useSelector((state)=>state.product);
   const [CategoryId,setCategoryId]=useState(0);
     const [visibleCount, setVisibleCount] = useState(8);
  const loadMore = () => {
    setVisibleCount(prev => prev + 8);
  };

  useEffect(() => {
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
        <div className="space-x-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Login</a>
          
          <NavLink  to={'/registration'}  className="hover:underline">Register</NavLink>
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
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filterProdut && filterProdut.slice(0,visibleCount).map((product) => (
              <div key={product.id} className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition">
                <img src={`http://127.0.0.1:8000/storage/${product.pimage}`}  alt={product.name} className="w-full h-40 object-cover rounded" />
                <h3 className="mt-2 font-semibold">{product.name}</h3>
                <p className="text-gray-600">₹{product.price}</p>
                <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
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