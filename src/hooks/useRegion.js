import { useState } from 'react';
import { Services } from '../services';

export const useRegion = () => {
    const [id, setId] = useState('');
	const [nom, setNom] = useState('');
	const [slug, setSlug] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getRegion = (regionId, signal) => {        
        return Services.RegionService.getById(regionId, signal)
        .then(response => {
            fillRegion(response.region);
            setIsDisabled(false);

            return response;
        });
    }

    const createRegion = signal => {
        const payload = {
            nom,
		slug,
		
        };

        return Services.RegionService.create(
        JSON.stringify(payload), signal);
    }
    const updateRegion = (regionId, signal) => {
        const payload = {
            nom,
		slug,
		
        };

        return Services.RegionService.update(
        	regionId, JSON.stringify(payload), signal);
    }
    const deleteRegion = (regionId, signal) => {
        return Services.RegionService.destroy(regionId, signal);
    }
    const fillRegion = (region) => {
        setId(region.id);
        setNom(region.nom ?? '');
		setSlug(region.slug ?? '');
		
    }
    const emptyRegion = () => {
        setId('');
        setNom('');
		setSlug('');
		
    }

    return {
        id,
        nom,
		slug,
		
        errors,
        isDisabled,
        setNom,
		setSlug,
		
        setId,
        setErrors,
        setIsDisabled,
        getRegion,
        createRegion,
        updateRegion,
        deleteRegion,
        fillRegion,
        emptyRegion
    };
}