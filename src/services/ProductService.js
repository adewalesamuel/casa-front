import { Api } from './Api';
import { CategoryService } from './CategoryService';
const ENDPOINT = '/products';


const getAll = (params, signal) => {
    let searchParams = params?.municipality_id ? 
    `&municipality_id=${params.municipality_id}`: '';
    searchParams += params?.nom ? `&nom=${params.nom}`: '';

    return Api.get(`${ENDPOINT}?page=${params?.page ?? ''}${searchParams}`, signal)
}

const getByUser = (params, signal) => {
    let searchParams = params?.municipality_id ? 
    `&municipality_id=${params.municipality_id}`: '';
    searchParams += params?.nom ? `&nom=${params.nom}`: '';

    return Api.get(`/user${ENDPOINT}?page=${params?.page ?? ''}${searchParams}`, signal)
}

const getById = (id, signal) => {
    return Api.get(`${ENDPOINT}/${id}`, signal);
}

const getBySlug = (slug, signal) => {
    return Api.get(`${ENDPOINT}-slug/${slug}`, signal);
}

const getByCategory = (category, params, signal) => {
    return Api.get(`${CategoryService.ENDPOINT}/${category}${ENDPOINT}?page=${params?.page ?? ''}`, signal);
}

const create = (payload, signal) => {
    return Api.post(`/user${ENDPOINT}`, payload, signal)
}

const update = (id, payload, signal) => {
    return Api.put(`/user${ENDPOINT}/${id}`, payload, signal)
}
const destroy = (id, signal) => {
    return Api.erase(`/user${ENDPOINT}/${id}`, signal)
}
const loadProductList = (page, category, signal) => {
    return category ? getByCategory(category, {page:page}, signal) : getAll({page:page}, signal)
}

export const ProductService = {
    ENDPOINT,
    getAll,
    getByUser,
    getById,
    getBySlug,
    getByCategory,
    create,
    update,
    destroy,
    loadProductList
}