import { useState } from 'react';
import { Services } from '../services';

export const useFeature = () => {
    const [id, setId] = useState('');
	const [nom, setNom] = useState('');
	const [slug, setSlug] = useState('');
	const [icon_img_url, setIcon_img_url] = useState('');
	const [display_img_url, setDisplay_img_url] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getFeature = (featureId, signal) => {        
        return Services.FeatureService.getById(featureId, signal)
        .then(response => {
            fillFeature(response.feature);
            setIsDisabled(false);

            return response;
        });
    }

    const createFeature = signal => {
        const payload = {
            nom,
		slug,
		icon_img_url,
		display_img_url,
		
        };

        return Services.FeatureService.create(
        JSON.stringify(payload), signal);
    }
    const updateFeature = (featureId, signal) => {
        const payload = {
            nom,
		slug,
		icon_img_url,
		display_img_url,
		
        };

        return Services.FeatureService.update(
        	featureId, JSON.stringify(payload), signal);
    }
    const deleteFeature = (featureId, signal) => {
        return Services.FeatureService.destroy(featureId, signal);
    }
    const fillFeature = (feature) => {
        setId(feature.id);
        setNom(feature.nom ?? '');
		setSlug(feature.slug ?? '');
		setIcon_img_url(feature.icon_img_url ?? '');
		setDisplay_img_url(feature.display_img_url ?? '');
		
    }
    const emptyFeature = () => {
        setId('');
        setNom('');
		setSlug('');
		setIcon_img_url('');
		setDisplay_img_url('');
		
    }

    return {
        id,
        nom,
		slug,
		icon_img_url,
		display_img_url,
		
        errors,
        isDisabled,
        setNom,
		setSlug,
		setIcon_img_url,
		setDisplay_img_url,
		
        setId,
        setErrors,
        setIsDisabled,
        getFeature,
        createFeature,
        updateFeature,
        deleteFeature,
        fillFeature,
        emptyFeature
    };
}