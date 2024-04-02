import { useState } from 'react';
import { Services } from '../services';

export const useMunicipality = () => {
    const [id, setId] = useState('');
	const [nom, setNom] = useState('');
	const [slug, setSlug] = useState('');
	const [city_id, setCity_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getMunicipality = (municipalityId, signal) => {        
        return Services.MunicipalityService.getById(municipalityId, signal)
        .then(response => {
            fillMunicipality(response.municipality);
            setIsDisabled(false);

            return response;
        });
    }

    const createMunicipality = signal => {
        const payload = {
            nom,
		slug,
		city_id,
		
        };

        return Services.MunicipalityService.create(
        JSON.stringify(payload), signal);
    }
    const updateMunicipality = (municipalityId, signal) => {
        const payload = {
            nom,
		slug,
		city_id,
		
        };

        return Services.MunicipalityService.update(
        	municipalityId, JSON.stringify(payload), signal);
    }
    const deleteMunicipality = (municipalityId, signal) => {
        return Services.MunicipalityService.destroy(municipalityId, signal);
    }
    const fillMunicipality = (municipality) => {
        setId(municipality.id);
        setNom(municipality.nom ?? '');
		setSlug(municipality.slug ?? '');
		setCity_id(municipality.city_id ?? '');
		
    }
    const emptyMunicipality = () => {
        setId('');
        setNom('');
		setSlug('');
		setCity_id('');
		
    }

    return {
        id,
        nom,
		slug,
		city_id,
		
        errors,
        isDisabled,
        setNom,
		setSlug,
		setCity_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getMunicipality,
        createMunicipality,
        updateMunicipality,
        deleteMunicipality,
        fillMunicipality,
        emptyMunicipality
    };
}