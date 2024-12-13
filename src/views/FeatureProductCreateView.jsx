//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function FeatureProductCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();
    const {id} = useParams();

    const useFeatureProduct = Hooks.useFeatureProduct();

    const [features, setFeatures] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useFeatureProduct.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useFeatureProduct.createFeatureProduct(abortController.signal);

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
        useFeatureProduct.setProduct_id(id);

        try {
            const { features } = await Services.FeatureService
			.getAll(abortController.signal);
			setFeatures(features);
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
            <h4>Ajouter Charactéristique</h4>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.FeatureProductForm 
            useFeatureProduct={useFeatureProduct}
            features={features} setFeatures={setFeatures}
			isDisabled={useFeatureProduct.isDisabled} 
            handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
