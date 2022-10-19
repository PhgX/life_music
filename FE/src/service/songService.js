import apiClient from "./apiClient";

const songApi = {
  getSong(data) {
    const url = "/songs";
    return apiClient.get(url, data);
  },
  getSongsByPlaylistId(data) {
    const url = `/songs/${data}`;
    return apiClient.get(url);
  },
  uploadedSongs(data) {
    const url = "/song/uploaded";
    return apiClient.get(url, data);
  },
  getSongById(data) {
    const url = `/song/${data}`;
    return apiClient.get(url, data);
  },
  deleteSong(data) {
    const url = `/song/${data}`;
    return apiClient.delete(url);
  },
  getCate() {
    const url = `/cate`;
    return apiClient.get(url);
  },
  updateSong(data) {
    const url = `/song/${data.songId}`;
    return apiClient.patch(url, data);
  },
  publicOrPrivate(data) {
    const url = `/song/status/${data.song._id}`;
    return apiClient.patch(url, data);
  },
  searchSong(data) {
    const url = `song/search/${data}`;
    return apiClient.get(url);
  },
  likedSongList(data) {
    const url = `/song/likedlist/${data}`;
    return apiClient.get(url);
  },
  getAllLikedSongs(data) {
    const url = `/song/likedlist/${data}`
    return apiClient.get(url)
  },
  likeOrNot(data) {
  
    const url = `/song/like/${data.songId}`
    return apiClient.post(url, data)
  }, 
  getSongRandom(data) {
    const url = '/song-random';
    return apiClient.get(url, data)
  }
};
export default songApi;
