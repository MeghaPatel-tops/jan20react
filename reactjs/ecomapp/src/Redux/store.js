import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./CategoryStore";

const store = configureStore({
    reducer:{
        'category':CategoryReducer
    }
})

export default store