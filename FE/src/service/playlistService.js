
import apiClient from './apiClient';

const playlistApi = {
    
    createPlaylist(data) {
        const url =`/playlist/${data.id}`;
        return apiClient.post(url, data);
    },

    getAllPlaylistUser(data) {
        const url = `/playlists/${data}`;
        return apiClient.get(url, data);
    },
    
    getPlaylistById(data) {
        const url = `/playlist/${data}`
        return apiClient.get(url,data);
    },
    updatePlaylist(id,data) {
        const url = `/playlist/${id}`
        return apiClient.patch(url,data);
    },
    addSongPlaylist(songId,playlistId) {
        const url = `/playlist/addsong/${songId}`
        return apiClient.post(url, {playlistId});
    },
    removeSongPlaylist(playlistId,songId) {
        const url = `/playlist/remove/${playlistId}`
        return apiClient.post(url, {songId});
    },
    deletePlaylist(playlistId) {
        const url = `/playlist/${playlistId}`
        return apiClient.delete(url);
    },
    getAllPlaylist(data) {
        const url = '/playlists'
        return apiClient.get(url, data);
    },
    getSongToPlaylist(data) {
        const url = `/playlist-song/${data}`;
        return apiClient.get(url, data);
    },
    searchPlaylist(data) {
        const url = `/playlist/search/${data}`;
        return apiClient.get(url);
    },
    getRandomPlaylist(data) {
        const url = "/playlist-random";
        return apiClient.get(url, data);
    }

}
export default playlistApi;