import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export const getCategory = createAsyncThunk('getCategory',async()=>{
    try {
          const res = await axios.get('http://127.0.0.1:8000/api/categories');
          return res.data;
          
          
          
    } catch (error) {
      
        return error
    }
})

export const getCategoryById = createAsyncThunk('getCategoryById',async(cid)=>{
    try {
          const res = await axios.get('http://127.0.0.1:8000/api/categories/'+cid);
          return res.data;
 
    } catch (error) {
      
        return error
    }
})
export const deleteCategory = createAsyncThunk('deleteCategory',async(id)=>{
    try {
          const res = await axios.delete(`http://127.0.0.1:8000/api/categories/${id}`);
          console.log(res.data);
          
          return res.data.message;
          
          
          
    } catch (error) {
      
        return error
    }
})
export const createCategory = createAsyncThunk('createCategory',async(data)=>{
    try {
          const res = await axios.post('http://127.0.0.1:8000/api/categories',data,
             {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
          );
          
          return res.data
          
    } catch (error) {
      
        return error
    }
})

export const updateCategory = createAsyncThunk('updateCategory',async(data)=>{
    try {
      console.log("in thunk", data.catdata);

      const res = await axios.post(
        `http://127.0.0.1:8000/api/categories/${data.id}`,
        data.catdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            _method: "PUT",  
          }
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Update failed");
    }
})


const CategorySlice = createSlice({
    name:'category',
    initialState:{
        isloading:false,
        msg:null,
        error:null,
        categoryData:[],
        singleCategory:{}
    },
    reducers:{
        clearMsg: (state) => {
            state.msg = null;
        }
    },
    extraReducers:(builder)=>{
           builder.addCase(createCategory.pending,(state,action)=>{
                 state.isloading=true;
           })
           .addCase(createCategory.fulfilled,(state,action)=>{
                state.isloading=false
                state.msg = action.payload.message
           })
           .addCase(createCategory.rejected,(state,action)=>{
              state.error=action.payload
           })
           .addCase(getCategory.pending,(state,action)=>{
                 state.isloading=true;
           })
           .addCase(getCategory.fulfilled,(state,action)=>{
                state.isloading=false
                state.categoryData = action.payload
           })
           .addCase(getCategory.rejected,(state,action)=>{
              state.error=action.payload
           })
           .addCase(deleteCategory.pending,(state,action)=>{
                 state.isloading=true;
           })
           .addCase(deleteCategory.fulfilled,(state,action)=>{
                state.isloading=false
               state.msg = action.payload;
           })
           .addCase(deleteCategory.rejected,(state,action)=>{
              state.error=action.payload
           })
            .addCase(getCategoryById.pending,(state,action)=>{
                 state.isloading=true;
           })
           .addCase(getCategoryById.fulfilled,(state,action)=>{
                state.isloading=false
               state.singleCategory = action.payload;
              
           })
           .addCase(getCategoryById.rejected,(state,action)=>{
              state.error=action.payload
           })
            .addCase(updateCategory.pending,(state,action)=>{
                 state.isloading=true;
           })
           .addCase(updateCategory.fulfilled,(state,action)=>{
                state.isloading=false
               state.msg = action.payload.message;
              
           })
           .addCase(updateCategory.rejected,(state,action)=>{
              state.error=action.payload
           })
    }
})

export const { clearMsg } = CategorySlice.actions;

const CategoryReducer = CategorySlice.reducer;
export default CategoryReducer