import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "./../../service/userService";
import {imageUpload} from "../../components/UploadFile/avatarUpload";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || {},
  loading: false,
  error: null,
};

export const register = createAsyncThunk("user/register", async (payload) => {
  const data = await userApi.register(payload);
  if(data.user)
  localStorage.setItem("user", JSON.stringify(data.user));
  return data.user;
});

export const login = createAsyncThunk("user/login", async (payload) => {
  const data = await userApi.login(payload);
  localStorage.setItem("access_token", data.access_token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data.user;
});
export const updateProfile = createAsyncThunk("user/profile", async (payload) => {
  const data = await userApi.updateProfile(payload);
  try{
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  }catch (err){
    console.log(err)
  }finally {
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  }

});
export const updateAvatar= createAsyncThunk("user/avatar", async (payload) => {
  try{
    let media;
    if(payload) media = await imageUpload([payload])
    const data = await userApi.updateAvatar({profileImage: media[0].url});
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  }catch (err){
    console.log(err)
  }
});
export const changePassword = createAsyncThunk("user/password", async (payload) => {
  const data = await userApi.changePassword(payload);
  try {
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  }catch (err){
    console.log(err)
  }
    finally {
    localStorage.setItem("user", JSON.stringify(data.user));
    return data.user;
  }

});



const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state, action) {
      localStorage.clear();
      state.user = {};
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [changePassword.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [updateAvatar.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
});

const { reducer, actions } = userSlice;
export const { logout } = actions;
export default reducer;
