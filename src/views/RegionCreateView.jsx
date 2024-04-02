//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function RegionCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useRegion = Hooks.useRegion();

    
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useRegion.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useRegion.createRegion(abortController.signal);

            navigate('/regions');
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useRegion.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useRegion.setIsDisabled(true);

        try {
            
        } catch (error) {
            console.log(error);
        } finally {
            useRegion.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer Region</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.RegionForm useRegion={useRegion}
            isDisabled={useRegion.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
