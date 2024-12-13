//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams, useNavigate } from 'react-router-dom';
import { Services } from '../services';

export function FeatureProductEditView() {
    let abortController = new AbortController();

    const {featureId} = useParams();
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
            await useFeatureProduct.updateFeatureProduct(
            	featureId, abortController.signal);

            navigate(-1);
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
            await useFeatureProduct.getFeatureProduct(
                featureId, abortController.signal);
            
            const { features } = await Services.FeatureService
			.getAll(abortController.signal);
			setFeatures(features);
        } catch (error) {
            console.log(error);
        } finally{
            useFeatureProduct.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h4>Modifier Charactéristique</h4>

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
