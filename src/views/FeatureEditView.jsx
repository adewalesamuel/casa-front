//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';

export function FeatureEditView() {
    let abortController = new AbortController();

    const {id} = useParams();

    const useFeature = Hooks.useFeature();

    
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useFeature.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useFeature.updateFeature(
            	id, abortController.signal);
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
            await useFeature.getFeature(id, abortController.signal);
            
            
        } catch (error) {
            console.log(error);
        } finally{
            useFeature.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3>Modifier Feature</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.FeatureForm useFeature={useFeature}
            isDisabled={useFeature.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
