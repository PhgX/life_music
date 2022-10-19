import {createSlice} from "@reduxjs/toolkit";
const initialState = {
    profile: [],
    formProfile: {
        name: '',
        description: '',
        action: ''
    }
}

const profileSlice= createSlice({
    name:'profile',
    initialState,
    reducers:{

    }
})

export const {

} = profileSlice.actions

export default profileSlice.reducer