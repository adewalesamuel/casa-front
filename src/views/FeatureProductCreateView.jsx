//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function FeatureProductCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useFeatureProduct = Hooks.useFeatureProduct();

    const [features, setFeatures] = useState([]);
	const [products, setProducts] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useFeatureProduct.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useFeatureProduct.createFeatureProduct(abortController.signal);

            navigate('/feature-products');
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useFeatureProduct.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useFeatureProduct.setIsDisabled(true);

        try {
            const { features } = await Services.FeatureService
			.getAll(abortController.signal);
			setFeatures(features);

			const { products } = await Services.ProductService
			.getAll(abortController.signal);
			setProducts(products);

			
        } catch (error) {
            console.log(error);
        } finally {
            useFeatureProduct.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer FeatureProduct</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.FeatureProductForm useFeatureProduct={useFeatureProduct}
            features={features} setFeatures={setFeatures}
			products={products} setProducts={setProducts}
			isDisabled={useFeatureProduct.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
