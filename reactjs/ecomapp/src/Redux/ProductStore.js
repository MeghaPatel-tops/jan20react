import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";



export const getProducts = createAsyncThunk('getProducts',async()=>{
    try {
          const res = await axios.get('http://127.0.0.1:8000/api/products');
          return res.data;
    
    } catch (error) {
      
        return error
    }
})

export const getProductById = createAsyncThunk('getProductById',async(pid)=>{
    try {
          const res = await axios.get('http://127.0.0.1:8000/api/products/'+pid);
          return res.data;
 
    } catch (error) {
      
        return error
    }
})

export const createProduct = createAsyncThunk('createProduct',async(data)=>{
    try {
          const res = await axios.post('http://127.0.0.1:8000/api/products',data,
             {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
          );
          console.log(res);
          
          
        if(res.status ==201){
            return res.data
         }
         else {
            throw new Error(res.message)
         }
          
    } catch (error) {
      
        return error
    }
})

export const deleteProduct = createAsyncThunk('deleteProduct',async(id)=>{
    try {
          const res = await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
          console.log(res.data);
          
          return res.data.message;
          
          
          
    } catch (error) {
      
        return error
    }
})

// export const updateCategory = createAsyncThunk('updateCategory',async(data)=>{
//     try {
//       console.log("in thunk", data.catdata);

//       const res = await axios.post(
//         `http://127.0.0.1:8000/api/categories/${data.id}`,
//         data.catdata,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           params: {
//             _method: "PUT",  
//           }
//         }
//       );

//       return res.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "Update failed");
//     }
// })


const ProductSlice = createSlice({
    name:'product',
    initialState:{
        productLoader:false,
        productMsg:null,
        ProductError:null,
        productData:[],
        singleProduct:{}
    },
    reducers:{
        clearMsg: (state) => {
            state.productMsg = null;
        }
    },
    extraReducers:(builder)=>{
           builder.addCase(createProduct.pending,(state,action)=>{
                 state.productLoader=true;
           })
           .addCase(createProduct.fulfilled,(state,action)=>{
                state.productLoader=false
                if(action.payload.status==422){
                    state.ProductError=action.payload.response.data.message
                    console.log(state.ProductError);
                    
                }
                else{
                    state.productMsg=action.payload.message
                }
           })
           .addCase(createProduct.rejected,(state,action)=>{
              state.ProductError=action.payload
           })
           .addCase(getProducts.pending,(state,action)=>{
                 state.productLoader=true;
           })
           .addCase(getProducts.fulfilled,(state,action)=>{
                state.productLoader=false
                state.productData = action.payload
                
           })
           .addCase(getProducts.rejected,(state,action)=>{
              state.ProductError=action.payload.response.data.message
           })
           .addCase(deleteProduct.pending,(state,action)=>{
                 state.productLoader=true;
           })
           .addCase(deleteProduct.fulfilled,(state,action)=>{
                state.productLoader=false
               state.productMsg = action.payload;
           })
           .addCase(deleteProduct.rejected,(state,action)=>{
              state.ProductError=action.payload.response.data.message
           })
            .addCase(getProductById.pending,(state,action)=>{
                 state.productLoader=true;
           })
           .addCase(getProductById.fulfilled,(state,action)=>{
                state.productLoader=false
               state.singleProduct = action.payload;
              
           })
           .addCase(getProductById.rejected,(state,action)=>{
              state.ProductError=action.payload.response.data.message
           })
        //     .addCase(updateCategory.pending,(state,action)=>{
        //          state.isloading=true;
        //    })
        //    .addCase(updateCategory.fulfilled,(state,action)=>{
        //         state.isloading=false
        //        state.msg = action.payload.message;
              
        //    })
        //    .addCase(updateCategory.rejected,(state,action)=>{
        //       state.error=action.payload
        //    })
    }
})

export const { clearMsg } = ProductSlice.actions;

const ProductReducer = ProductSlice.reducer;
export default ProductReducer