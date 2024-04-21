import { Api } from './Api';

const ENDPOINT = '/users';

const getAll = (params, signal) => {
    return Api.get(`${ENDPOINT}?page=${params?.page ?? ''}`, signal)
}

const getById = (id, signal) => {
    return Api.get(`${ENDPOINT}/${id}`, signal);
}

const create = (payload, signal) => {
    return Api.post(ENDPOINT, payload, signal)
}

const update = (payload, signal) => {
    return Api.put(`/profile`, payload, signal)
}
const destroy = (id, signal) => {
    return Api.erase(`${ENDPOINT}/${id}`, signal)
}

export const UserService = {
    ENDPOINT,
    getAll,
    getById,
    create,
    update,
    destroy
}