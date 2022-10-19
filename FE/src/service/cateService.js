import apiClient from './apiClient';

const cateApi = {
    getCate() {
        const url = `/cate`;
        return apiClient.get(url)
    },
}
export default cateApi;