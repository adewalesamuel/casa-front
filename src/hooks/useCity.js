import { useState } from 'react';
import { Services } from '../services';

export const useCity = () => {
    const [id, setId] = useState('');
	const [nom, setNom] = useState('');
	const [slug, setSlug] = useState('');
	const [region_id, setRegion_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getCity = (cityId, signal) => {        
        return Services.CityService.getById(cityId, signal)
        .then(response => {
            fillCity(response.city);
            setIsDisabled(false);

            return response;
        });
    }

    const createCity = signal => {
        const payload = {
            nom,
		slug,
		region_id,
		
        };

        return Services.CityService.create(
        JSON.stringify(payload), signal);
    }
    const updateCity = (cityId, signal) => {
        const payload = {
            nom,
		slug,
		region_id,
		
        };

        return Services.CityService.update(
        	cityId, JSON.stringify(payload), signal);
    }
    const deleteCity = (cityId, signal) => {
        return Services.CityService.destroy(cityId, signal);
    }
    const fillCity = (city) => {
        setId(city.id);
        setNom(city.nom ?? '');
		setSlug(city.slug ?? '');
		setRegion_id(city.region_id ?? '');
		
    }
    const emptyCity = () => {
        setId('');
        setNom('');
		setSlug('');
		setRegion_id('');
		
    }

    return {
        id,
        nom,
		slug,
		region_id,
		
        errors,
        isDisabled,
        setNom,
		setSlug,
		setRegion_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getCity,
        createCity,
        updateCity,
        deleteCity,
        fillCity,
        emptyCity
    };
}