import { Api } from './Api';
import { CategoryService } from './CategoryService';
const ENDPOINT = '/products';


const getAll = (params, signal) => {
    return Api.get(`${ENDPOINT}?page=${params?.page ?? ''}`, signal)
}

const getById = (id, signal) => {
    return Api.get(`${ENDPOINT}/${id}`, signal);
}

const getBySlug = (slug, signal) => {
    return Api.get(`${ENDPOINT}/${slug}`, signal);
}

const getByCategory = (category, params, signal) => {
    return Api.get(`${CategoryService.ENDPOINT}/${category}${ENDPOINT}?page=${params?.page ?? ''}`, signal);
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
const loadProductList = (page, category, signal) => {
    return category ? getByCategory(category, {page:page}, signal) : getAll({page:page}, signal)
}

export const ProductService = {
    ENDPOINT,
    getAll,
    getById,
    getBySlug,
    getByCategory,
    create,
    update,
    destroy,
    loadProductList
}