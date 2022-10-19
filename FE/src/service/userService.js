
import apiClient from './apiClient';

const userApi = {
    register(data) {
        const url ='/register';
        return apiClient.post(url, data)
    },

    login(data) {

        const url = '/login';
        return apiClient.post(url, data)
    },

    uploadSong(data) {
        const url = '/song';
        return apiClient.post(url, data)
    },
    changePassword(data){
        const url = '/password';
        return apiClient.patch(url,data)
    },
    updateProfile(data) {
        const url = '/user';
        return apiClient.patch(url, data)
    },
    updateAvatar(data) {
        const url = '/user/avatar';
        console.log(data);
        return apiClient.patch(url, data)
    },
}
export default userApi;