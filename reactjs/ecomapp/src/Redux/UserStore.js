import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react";




// export const getProducts = createAsyncThunk('getProducts',async()=>{
//     try {
//           const res = await axios.get('http://127.0.0.1:8000/api/products');
//           return res.data;
    
//     } catch (error) {
      
//         return error
//     }
// })

// export const getProductById = createAsyncThunk('getProductById',async(pid)=>{
//     try {
//           const res = await axios.get('http://127.0.0.1:8000/api/products/'+pid);
//           return res.data;
 
//     } catch (error) {
      
//         return error
//     }
// })

export const createUser = createAsyncThunk('createUser',async(data)=>{
    try {
          const res = await axios.post('http://127.0.0.1:8000/api/register',data,
             {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
          );
          console.log(res);
          
          
        if(res.status ==201){
            console.log('useres',res);
            
            return res.data
         }
       
         else {
            throw new Error(res.message)
         }
          
    } catch (error) {
      
        return error
    }
})

// export const deleteProduct = createAsyncThunk('deleteProduct',async(id)=>{
//     try {
//           const res = await axios.delete(`http://127.0.0.1:8000/api/products/${id}`);
//           console.log(res.data);
          
//           return res.data.message;
          
          
          
//     } catch (error) {
      
//         return error
//     }
// })

// export const updateProduct = createAsyncThunk('updateProduct',async(data)=>{
//     try {
//       console.log("in thunk", data.prodata);

//       const res = await axios.post(
//         `http://127.0.0.1:8000/api/products/${data.pid}`,
//         data.prodata,
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
//       return error
//     }
// })


const UserSlice = createSlice({
    name:'users',
    initialState:{
        userLoader:false,
        userMsg:null,
        userError:null,
        singleProduct:{}
    },
    reducers:{
        clearMsg: (state) => {
            state.userMsg = null;
        }
    },
    extraReducers:(builder)=>{
           builder.addCase(createUser.pending,(state,action)=>{
                state.userLoader=true;
           })
           .addCase(createUser.fulfilled,(state,action)=>{
                state.userLoader=false;
              
                
                if(action.payload.status==422){
                    state.userError=action.payload.response.data.message
                    console.log(state.userError);
                    
                }
                else{
                    state.userMsg=action.payload.message
                }
           })
           .addCase(createUser.rejected,(state,action)=>{
               state.userError=action.payload.response.data.message
           })
          
    }
})

export const { clearMsg } = UserSlice.actions;

const UserReducer = UserSlice.reducer;
export default UserReducer