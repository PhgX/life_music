

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import playlistApi from "./../../service/playlistService";
import userApi from "./../../service/userService";

const initialState = {
  playlists: [],
  playlist: {},
  loading: false,
  fetchPlaylistStatus: "idle",
  addSongToPlaylistStatus: 'idle',
};

export const uploadSong = createAsyncThunk("user/uploadSong", async (payload) => {
  const data = await userApi.uploadSong(payload);
  return data;
});
export const createPlaylist = createAsyncThunk(`createPlaylist/playlist`, async (payload) => {
  const data = await playlistApi.createPlaylist(payload);
  return data.playlists;
});

// getplay list and user
export const fetchPlaylist = createAsyncThunk("fetchPlaylist/playlist", async (payload) => {
  const data = await playlistApi.getAllPlaylistUser(payload);
  return data.playlists;
});
// get all play list
export const getAllPlaylist = createAsyncThunk(
  "/playlists",
  async (payload) => {
    const data = await playlistApi.getAllPlaylist(payload);
    return data.playlists;
  }
);
export const addToPlaylist = createAsyncThunk(
  "addToPlaylist/playlist/addsong/:songId",
  async (payload) => {
    const data = await playlistApi.addSongPlaylist(payload);
    return data
  }
);

export const getPlaylistAndUser = createAsyncThunk("/playlists/:id", async (payload) => {
  const data = await playlistApi.getAllPlaylistUser(payload);
  return data.playlists;
});

const playlistSlice = createSlice({
  name: "playlist",
  initialState,

  reducers: {},
  extraReducers: {
    [createPlaylist.fulfilled]: (state, action) => {
      state.playlist = action.payload;
    },
    [fetchPlaylist.pending]: (state, action) => {
      state.fetchPlaylistStatus = 'loading';
    },
    [fetchPlaylist.fulfilled]: (state, action) => {
      state.fetchPlaylistStatus = 'success';
      state.playlist = action.payload;
    },
    [fetchPlaylist.rejected]: (state, action) => {
      state.fetchPlaylistStatus = 'false';
    },
    [getAllPlaylist.fulfilled]: (state, action) => {
      state.playlist = action.payload;
    },
    [addToPlaylist.pending]: (state, action) => {
      state.addSongToPlaylistStatus = 'loading';
    },
    [addToPlaylist.fulfilled]: (state, action) => {
      state.addSongToPlaylistStatus = 'success';
    },
    [addToPlaylist.rejected]: (state, action) => {
      state.addSongToPlaylistStatus = 'false';
    },
    [createPlaylist.fulfilled] : (state, action) => {
      state.playlists = action.payload;
    },
    [getPlaylistAndUser.fulfilled] : (state, action) => {
        state.playlists = action.payload
    },
 
  },

});
const { reducer, actions } = playlistSlice;

export default reducer;
