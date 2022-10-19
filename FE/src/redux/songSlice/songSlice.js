import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userApi from "./../../service/userService";
import songApi from "./../../service/songService";
const initialState = {
  status: "idle",
  getUploadSongsStatus: "idle",
  deleteSongStatus: "idle",
  publicOrPrivateStatus: "idle",
  likedSongsStatus: "idle",
  getAllLikedSongsStatus: "idle",
  likeOrNotStatus: "idle",
  songs: [],
  loading: false,
  search: [],
  uploadSongs: [],
  likedSongs: [],
  songRandom:[],
  getAllLikedSongs: [],
  likeOrNot: {}
};
export const getUploadedSongs = createAsyncThunk("user/getUploadedSongs", async (payload) => {
  const data = await songApi.uploadedSongs(payload);
  return data;
});

export const uploadSong = createAsyncThunk("user/uploadSong", async (payload) => {
  const data = await userApi.uploadSong(payload);
  return data;
});

export const fetchSong = createAsyncThunk("/songs", async (payload) => {
  const data = await songApi.getSong();
  return data.songs;
});
export const getSongsByPlaylistId = createAsyncThunk("/songs/id", async (payload) => {
  const data = await songApi.getSongsByPlaylistId(payload);
  return data.songs;
});
export const searchSong = createAsyncThunk(
    '/song/search',
    async (term) => {
      const res = await songApi.searchSong(term);
      return res;
});

export const deleteSongById = createAsyncThunk('song/deleteSong', (payload) => {
  const data = songApi.deleteSong(payload);
  return data
});

export const updateSongInfo = createAsyncThunk('song/updateSong', async (payload) => {
  const data = await songApi.updateSong(payload);
  return data
});

export const publicOrPrivate = createAsyncThunk('song/updateSong', (payload) => {
  const data = songApi.publicOrPrivate(payload);
  return data
});

export const likedSongs = createAsyncThunk('song/likedSongs', (payload) => {
  const data = songApi.likedSongList(payload);
  return data
});

export const getAllLikedSongs = createAsyncThunk('song/getAllLikedSongs', (payload) => {
  const data = songApi.getAllLikedSongs(payload);
  return data
});

export const likeOrNot = createAsyncThunk('song/likeOrNot', (payload) => {
  const data = songApi.likeOrNot(payload);
  return data
});

export const getSongRandom = createAsyncThunk('song/SongRandom', (payload) => {
  const data = songApi.getSongRandom(payload);
  return data;
});

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    loading(state, action) {
      state.status = action.payload
    },
    changeStatus(state, action) {
      state.status = action.payload
    },
    changeDeleteSongStatus (state, action) {
      state.deleteSongStatus = action.payload
    },
    upSong(state, action) {
      state.songs.push(action.payload)
    },
  },
  extraReducers : {
    [fetchSong.fulfilled] : (state, action) => {
      state.songs = action.payload;
    },
    [uploadSong.pending] : (state, action) => {
      state.status = 'loading'
    },
    [uploadSong.fulfilled] : (state, action) => {
      state.status = 'success';
    },
    [uploadSong.rejected] : (state, action) => {
      state.status = 'false'
    },
    [getUploadedSongs.pending] : (state, action) => {
      state.getUploadSongsStatus = 'loading';
    },
    [getUploadedSongs.fulfilled] : (state, action) => {
      state.getUploadSongsStatus = 'success';
      state.uploadSongs = action.payload
    },
    [getUploadedSongs.rejected] : (state, action) => {
      state.getUploadSongsStatus = 'false';
    },
    [getSongsByPlaylistId.fulfilled] : (state, action) => {
      state.getUploadSongsStatus = 'success';
      state.songs = action.payload;
    },
    [searchSong.fulfilled] : (state, action) => {
      // state.songs = action.payload
      // state.songs = action.payload.length >0 ? action.payload : state.songs;
      state.songs = action.payload;
    },

    [deleteSongById.fulfilled] : (state, action) => {
      state.deleteSongStatus = 'success';
    },
    [deleteSongById.rejected] : (state, action) => {
      state.deleteSongStatus = 'false'
    },
    [updateSongInfo.pending] : (state, action) => {
      state.publicOrPrivateStatus = 'loading';
    },
    [updateSongInfo.fulfilled] : (state, action) => {
      state.publicOrPrivateStatus = 'success';
    },
    [updateSongInfo.rejected] : (state, action) => {
      state.publicOrPrivateStatus = 'false';
    },
    [likedSongs.pending] : (state, action) => {
      state.likedSongsStatus = 'loading'
    },
    [likedSongs.fulfilled] : (state, action) => {
      state.likedSongsStatus = 'success';
      state.likedSongs = action.payload.userDoc.likeSongs;
    },
    [likedSongs.rejected] : (state, action) => {
      state.likedSongsStatus = 'false';
    },
    [getAllLikedSongs.pending] : (state, action) => {
      state.getAllLikedSongsStatus = 'loading'
    },
    [getAllLikedSongs.fulfilled] : (state, action) => {
      state.getAllLikedSongsStatus = 'success';
      state.getAllLikedSongs = action.payload.userDoc.likeSongs;
      console.log('123', action.payload.userDoc.likeSongs)
    },
    [getAllLikedSongs.rejected] : (state, action) => {
      state.getAllLikedSongsStatus = 'false';
    },
    [likeOrNot.pending] : (state, action) => {
      state.likeOrNotStatus = 'loading';
    },
    [likeOrNot.fulfilled] : (state, action) => {
      state.likeOrNotStatus = 'success';
      state.likeOrNot = action.payload;
    },
    [likeOrNot.rejected] : (state, action) => {
      state.likeOrNotStatus = 'false';
    },

    [getSongRandom.fulfilled]: (state, action) => {
    state.songRandom = action.payload
    }
  }
});

const { reducer, actions } = songSlice;
export const {upSong, loading, changeStatus, changeDeleteSongStatus} = actions;
export default reducer;
