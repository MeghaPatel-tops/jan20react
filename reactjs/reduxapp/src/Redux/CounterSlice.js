import { createSlice } from "@reduxjs/toolkit";

const CounterSlice = createSlice({
    name:'Counter',
    initialState:{value:0},
    reducers:{
        incre:(state)=>{
            state.value+=1
        }
        ,decre:(state)=>{
            state.value-=1
        }
    }
})
export const {incre,decre}=CounterSlice.actions;
const CounterReducer = CounterSlice.reducer;
export default CounterReducer