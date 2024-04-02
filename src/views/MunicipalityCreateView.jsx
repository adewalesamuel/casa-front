//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function MunicipalityCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useMunicipality = Hooks.useMunicipality();

    const [citys, setCitys] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useMunicipality.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useMunicipality.createMunicipality(abortController.signal);

            navigate('/municipalitys');
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useMunicipality.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useMunicipality.setIsDisabled(true);

        try {
            const { citys } = await Services.CityService
			.getAll(abortController.signal);
			setCitys(citys);

			
        } catch (error) {
            console.log(error);
        } finally {
            useMunicipality.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer Municipality</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.MunicipalityForm useMunicipality={useMunicipality}
            citys={citys} setCitys={setCitys}
			isDisabled={useMunicipality.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
