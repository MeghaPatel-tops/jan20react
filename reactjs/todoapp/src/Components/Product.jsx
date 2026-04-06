import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Product() {
    const [product, setProduct] = useState([]);
    // const getProducts = async () => {
    //     let res = await fetch('https://fakestoreapi.com/products');
    //     let data = await res.json();
    //     console.log(data);
    //     setProduct(data)

    // }

    const getProducts = async()=>{
        try {
            let res =await  axios.get('https://fakestoreapi.com/products');
            console.log(res.data);
            setProduct(res.data)
            
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(() => {
        getProducts();
    }, [])
    return (
        <div>
            <div class="container my-5">
                <h2 class="text-center mb-4">Product Catalog</h2>

                <div class="row g-4">
                    {
                        product && product.map((index, i) => (
                            <div class="col-md-4" key={i}>
                                <div class="card h-100 shadow-sm">
                                    <img src={index.image} height={'200px'} />
                                    <div class="card-body">
                                        <h5 class="card-title">{index.title.substr(0,15)}</h5>
                                        <p class="card-text">{index.description.substr(0,100)}</p>
                                        <p class="fw-bold">{index.price}</p>
                                        <button class="btn btn-primary w-100">Add to Cart</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }


                 

                </div>
            </div>
        </div>
    )
}

export default Product