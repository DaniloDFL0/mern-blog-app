import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    currentUser: null,
    error: null,
    isLoading: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.isLoading = true
            state.error = null
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload
            state.isLoading = false
            state.error = null
        },
        signInFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        updateStart: (state) => {
            state.isLoading = true
            state.error = null
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload
            state.isLoading = false
            state.error = null
        },
        updateUserFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        },
        deleteUserStart: (state) => {
            state.isLoading = true
            state.error = null
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null
            state.isLoading = false
            state.error = null
        },
        deleteUserFailure: (state, action) => {
            state.isLoading = false
            state.error = action.payload
        }
    }
})

export const { 
    signInStart, 
    signInSuccess, 
    signInFailure, 
    updateStart, 
    updateUserSuccess, 
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure 
} = userSlice.actions
export default userSlice.reducer