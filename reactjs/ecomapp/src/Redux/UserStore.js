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

export const createUser = createAsyncThunk('createUser', async (data) => {
    try {
        const res = await axios.post('http://127.0.0.1:8000/api/register', data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );



        if (res.status == 201) {
            console.log('useres', res);
            console.log(res);
            let loggedUser = {
                token: res.data.token,
                user: res.data.user
            }

            localStorage.setItem('loggedUser', JSON.stringify(loggedUser))

            return res.data

        }

        else {
            throw new Error(res.message)
        }

    } catch (error) {

        return error
    }
})

export const addtoCartFunction = createAsyncThunk('addtoCartFunction', async (data) => {
    try {
        const res = await axios.post('http://127.0.0.1:8000/api/add-to-cart', data.cart,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${data.token}`,
                },
            }
        );


        return res.data;

    } catch (error) {

        return error
    }
})

//////////////////////View cart-=======================

export const viewCartFunction = createAsyncThunk('viewCartFunction', async (data) => {

    try {
        const res = await axios.get('http://127.0.0.1:8000/api/cart',
            {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
            }
        );
        console.log(res.data);

        return res.data;

    } catch (error) {

        return error
    }
})



//=========================End==========================

// ========================UpdateCart==========================

export const updateCartFunction = createAsyncThunk('updateCartFunction', async (data) => {

    try {
        const res = await axios.post('http://127.0.0.1:8000/api/update-cart/', data.data,
            {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },
                _method: 'put'

            }
        );
        console.log("update", res.data);

        return res.data;

    } catch (error) {

        return error
    }
})

// ==========================================================
// ========================UpdateCart==========================

export const deleteCartFunction = createAsyncThunk('deleteCartFunction', async (data) => {
    console.log("inthunk", data.token);


    try {
        const res = await axios.post(`http://127.0.0.1:8000/api/remove-from-cart/${data.cartid}`,
            {
                _method: 'DELETE' // Laravel method spoofing
            },
            {
                headers: {
                    Authorization: `Bearer ${data.token}`,
                },


            }
        );
        console.log("delete", res.data);

        return res.data;

    } catch (error) {

        return error
    }
})

// ==========================================================
export const loginUser = createAsyncThunk('loginUser', async (data) => {
    try {
        const res = await axios.post('http://127.0.0.1:8000/api/login', data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        console.log(res.status);

        if (res.status == 200 || res.status == 201) {
            console.log('useres', res);

            let loggedUser = {
                token: res.data.token,
                user: res.data.user
            }
            console.log(res);


            localStorage.setItem('loggedUser', JSON.stringify(loggedUser))

            return res.data

        }

        else {
            throw new Error(res.message)
        }

    } catch (error) {

        return error
    }
})



const UserSlice = createSlice({
    name: 'users',
    initialState: {
        userLoader: false,
        userMsg: null,
        userError: null,
        singleProduct: {},
        cartData: [],
        cartTotal: 0
    },
    reducers: {
        clearMsg: (state) => {
            state.userMsg = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.pending, (state, action) => {
            state.userLoader = true;
        })
            .addCase(createUser.fulfilled, (state, action) => {
                state.userLoader = false;


                if (action.payload.status == 422) {
                    state.userError = action.payload.response.data.message
                    console.log(state.userError);

                }
                else {
                    state.userMsg = action.payload.message
                }
            })
            .addCase(createUser.rejected, (state, action) => {
                state.userError = action.payload.response.data.message
            })
            .addCase(addtoCartFunction.pending, (state, action) => {
                state.userLoader = true;
            })
            .addCase(addtoCartFunction.fulfilled, (state, action) => {
                state.userLoader = false;


                if (action.payload.status == 401) {
                    state.userError = action.payload.response.data.message
                    console.log(state.userError);

                }
                else {
                    state.userMsg = action.payload.message
                }
            })
            .addCase(addtoCartFunction.rejected, (state, action) => {
                state.userError = action.payload.response.data.message
            })

            //=====================cartview===================
            .addCase(viewCartFunction.pending, (state, action) => {
                state.userLoader = true;
            })
            .addCase(viewCartFunction.fulfilled, (state, action) => {
                state.userLoader = false;


                if (action.payload.status == 401) {
                    state.userError = action.payload.response.data.message
                    console.log(state.userError);

                }
                else {
                    state.cartData = action.payload.data;
                    state.cartTotal = action.payload.total_price
                }
            })
            .addCase(viewCartFunction.rejected, (state, action) => {
                state.userError = action.payload.response.data.message
            })
            //===========================================
            //=====================updateview===================
            .addCase(updateCartFunction.pending, (state, action) => {
                state.userLoader = true;
            })
            .addCase(updateCartFunction.fulfilled, (state, action) => {
                state.userLoader = false;


                if (action.payload.status == 401) {
                    state.userError = action.payload.response.data.message
                    console.log(state.userError);

                }
                else {

                    state.cartData = action.payload.data;
                    state.cartTotal = action.payload.total_price
                }
            })
            .addCase(updateCartFunction.rejected, (state, action) => {
                state.userError = action.payload.response.data.message
            })
            //===========================================
            //=====================updateview===================
            .addCase(deleteCartFunction.pending, (state, action) => {
                state.userLoader = true;
            })
            .addCase(deleteCartFunction.fulfilled, (state, action) => {
                state.userLoader = false;


                if (action.payload.status == 401) {
                    state.userError = action.payload.response.data.message
                    console.log(state.userError);

                }
                else {
                    state.userMsg = action.payload.message
                }
            })
            .addCase(deleteCartFunction.rejected, (state, action) => {
                state.userError = action.payload.response.data.message
            })
            //===========================================



            //    ===========Login==========================
            .addCase(loginUser.pending, (state, action) => {
                state.userLoader = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.userLoader = false;


                if (action.payload.status == 422) {
                    state.userError = action.payload.response.data.message
                    console.log(state.userError);

                }
                else {
                    state.userMsg = action.payload.message
                }
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.userError = action.payload.response.data.message
            })

    }
})

export const { clearMsg } = UserSlice.actions;

const UserReducer = UserSlice.reducer;
export default UserReducer