import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   user:{uid:2632, role: 'admin', fullname: 'Nitesh'}, 
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        getUser:(state, action)=>{
            state.user=action.payload
        },
        logout:(state, action)=>{
            state.user={}
        }
    }
});

export const {getUser, logout}=userSlice.actions;
export default userSlice.reducer;