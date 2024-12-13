import { Api } from './Api';
import { FeatureService } from './FeatureService';
import { ProductService } from './ProductService';

const ENDPOINT = '/feature-products';
const FEATURE_ENDPOINT = FeatureService.ENDPOINT;
const PRODUCT_ENDPOINT = ProductService.ENDPOINT;

const getAll = (params, signal) => {
    return Api.get(`${ENDPOINT}?page=${params?.page ?? ''}`, signal)
}

const getById = (id, signal) => {
    return Api.get(`${ENDPOINT}/${id}`, signal);
}

const getByProductId = (productId, signal) => {
    return Api.get(`${PRODUCT_ENDPOINT}/${productId}${FEATURE_ENDPOINT}`, signal);
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

export const FeatureProductService = {
    ENDPOINT,
    getByProductId,
    getAll,
    getById,
    create,
    update,
    destroy
}