import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cateApi from "./../../service/cateService";

const initialState = {
  status: "idle",
  categories: [],
  loading: false,
};

export const getCategories = createAsyncThunk("cate/getCategories", () => {
  const data = cateApi.getCate();
  return data;
});
const cateSlice = createSlice({
  name: "cate",
  initialState,
  
  extraReducers: {
    [getCategories.pending]: (state, action) => {
      state.status = "loading";
    },
    [getCategories.fulfilled]: (state, action) => {
      state.status = "success";
      state.categories = action.payload
    },
    [getCategories.rejected]: (state, action) => {
      state.status = "false";
    },
  },
});

const { reducer } = cateSlice;

export default reducer;
