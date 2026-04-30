import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./CategoryStore";
import ProductReducer from "./ProductStore";
import UserReducer from "./UserStore";

const store = configureStore({
    reducer:{
        'category':CategoryReducer,
        'product':ProductReducer,
        'users':UserReducer
    }
})

export default store