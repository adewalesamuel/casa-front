import { Api } from './Api';

const  ENPOINTS = {
    File: '/upload',
    FileDoc: '/upload-file',
};

const store = (payload, signal) => {
    return Api.postFormData(ENPOINTS.File, payload, signal)
}

const storeDoc = (payload, signal) => {
    return Api.postFormData(ENPOINTS.FileDoc, payload, signal)
}

const product_store = (payload, signal) => {
    return Api.postFormData(`/product${ENPOINTS.File}`, payload, signal)
}


export const FileService = {
    store,
    storeDoc,
    product_store,
}