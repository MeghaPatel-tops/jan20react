import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./CategoryStore";
import ProductReducer from "./ProductStore";

const store = configureStore({
    reducer:{
        'category':CategoryReducer,
        'product':ProductReducer
    }
})

export default store