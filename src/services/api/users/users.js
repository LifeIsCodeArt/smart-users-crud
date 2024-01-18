import http from "../http-basic.js";

export default {

    getAll() {
        return http.get('api/users?page=1')
    },

    create(data) {
        return http.post('api/users', data)
    },

    update(data) {
        return http.patch(`api/users/${data.id}`, data)
    },

    delete(id) {
        return http.delete(`/api/users?id=${id}`)
    }


}