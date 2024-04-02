//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function FeatureCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useFeature = Hooks.useFeature();

    
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useFeature.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useFeature.createFeature(abortController.signal);

            navigate('/features');
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useFeature.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useFeature.setIsDisabled(true);

        try {
            
        } catch (error) {
            console.log(error);
        } finally {
            useFeature.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer Feature</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.FeatureForm useFeature={useFeature}
            isDisabled={useFeature.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
