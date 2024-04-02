//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';

export function CityEditView() {
    let abortController = new AbortController();

    const {id} = useParams();

    const useCity = Hooks.useCity();

    const [regions, setRegions] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useCity.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useCity.updateCity(
            	id, abortController.signal);
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
            await useCity.getCity(id, abortController.signal);
            
            const { regions } = await Services.RegionService
			.getAll(abortController.signal);
			setRegions(regions);

			
        } catch (error) {
            console.log(error);
        } finally{
            useCity.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3>Modifier City</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.CityForm useCity={useCity}
            regions={regions} setRegions={setRegions}
			isDisabled={useCity.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
