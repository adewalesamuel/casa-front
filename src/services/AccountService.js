import { Api } from './Api';

const ENDPOINT = '/accounts';

const getAnalytics = (signal) => {
    return Api.get(`${ENDPOINT}/analytics`, signal)
}
const getAll = (params, signal) => {
    return Api.get(`${ENDPOINT}?page=${params?.page ?? ''}`, signal)
}

const getById = (id, signal) => {
    return Api.get(`${ENDPOINT}/${id}`, signal);
}

const create = (payload, signal) => {
    return Api.post(ENDPOINT, payload, signal)
}

const update = (id, payload, signal) => {
    return Api.put(`${ENDPOINT}/${id}`, payload, signal)
}
const destroy = (id, signal) => {
    return Api.erase(`${ENDPOINT}/${id}`, signal)
}

export const AccountService = {
    ENDPOINT,
    getAnalytics,
    getAll,
    getById,
    create,
    update,
    destroy
}