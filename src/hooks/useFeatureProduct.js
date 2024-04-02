import { useState } from 'react';
import { Services } from '../services';

export const useFeatureProduct = () => {
    const [id, setId] = useState('');
	const [feature_id, setFeature_id] = useState('');
	const [product_id, setProduct_id] = useState('');
	const [quantite, setQuantite] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getFeatureProduct = (feature_productId, signal) => {        
        return Services.FeatureProductService.getById(feature_productId, signal)
        .then(response => {
            fillFeatureProduct(response.feature_product);
            setIsDisabled(false);

            return response;
        });
    }

    const createFeatureProduct = signal => {
        const payload = {
            feature_id,
		product_id,
		quantite,
		
        };

        return Services.FeatureProductService.create(
        JSON.stringify(payload), signal);
    }
    const updateFeatureProduct = (feature_productId, signal) => {
        const payload = {
            feature_id,
		product_id,
		quantite,
		
        };

        return Services.FeatureProductService.update(
        	feature_productId, JSON.stringify(payload), signal);
    }
    const deleteFeatureProduct = (feature_productId, signal) => {
        return Services.FeatureProductService.destroy(feature_productId, signal);
    }
    const fillFeatureProduct = (feature_product) => {
        setId(feature_product.id);
        setFeature_id(feature_product.feature_id ?? '');
		setProduct_id(feature_product.product_id ?? '');
		setQuantite(feature_product.quantite ?? '');
		
    }
    const emptyFeatureProduct = () => {
        setId('');
        setFeature_id('');
		setProduct_id('');
		setQuantite('');
		
    }

    return {
        id,
        feature_id,
		product_id,
		quantite,
		
        errors,
        isDisabled,
        setFeature_id,
		setProduct_id,
		setQuantite,
		
        setId,
        setErrors,
        setIsDisabled,
        getFeatureProduct,
        createFeatureProduct,
        updateFeatureProduct,
        deleteFeatureProduct,
        fillFeatureProduct,
        emptyFeatureProduct
    };
}