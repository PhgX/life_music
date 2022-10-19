import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import songApi from './../../service/songService';



const initialState = {
  currentSong: {},
  loading: false
};


export const  getSongById= createAsyncThunk("/song/id", async(payload)=> {
  
  const data = await songApi.getSongById(payload);
  return data;
})

const currentSongSlice = createSlice({
  name: "currentSong",
  initialState,
  reducers: { 
  },
  extraReducers : {
 
    [getSongById.fulfilled] : (state, action) => {
      state.currentSong = action.payload
    }
}
});

const { reducer, actions } = currentSongSlice;

export default reducer;
