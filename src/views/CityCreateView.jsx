//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function CityCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useCity = Hooks.useCity();

    const [regions, setRegions] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useCity.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useCity.createCity(abortController.signal);

            navigate('/citys');
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useCity.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useCity.setIsDisabled(true);

        try {
            const { regions } = await Services.RegionService
			.getAll(abortController.signal);
			setRegions(regions);

			
        } catch (error) {
            console.log(error);
        } finally {
            useCity.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer City</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.CityForm useCity={useCity}
            regions={regions} setRegions={setRegions}
			isDisabled={useCity.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
