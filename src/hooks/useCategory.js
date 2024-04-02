import { useState } from 'react';
import { Services } from '../services';

export const useCategory = () => {
    const [id, setId] = useState('');
	const [nom, setNom] = useState('');
	const [slug, setSlug] = useState('');
	const [description, setDescription] = useState('');
	const [icon_img_url, setIcon_img_url] = useState('');
	const [display_img_url, setDisplay_img_url] = useState('');
	const [quantite, setQuantite] = useState('');
	const [category_id, setCategory_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getCategory = (categoryId, signal) => {        
        return Services.CategoryService.getById(categoryId, signal)
        .then(response => {
            fillCategory(response.category);
            setIsDisabled(false);

            return response;
        });
    }

    const createCategory = signal => {
        const payload = {
            nom,
		slug,
		description,
		icon_img_url,
		display_img_url,
		quantite,
		category_id,
		
        };

        return Services.CategoryService.create(
        JSON.stringify(payload), signal);
    }
    const updateCategory = (categoryId, signal) => {
        const payload = {
            nom,
		slug,
		description,
		icon_img_url,
		display_img_url,
		quantite,
		category_id,
		
        };

        return Services.CategoryService.update(
        	categoryId, JSON.stringify(payload), signal);
    }
    const deleteCategory = (categoryId, signal) => {
        return Services.CategoryService.destroy(categoryId, signal);
    }
    const fillCategory = (category) => {
        setId(category.id);
        setNom(category.nom ?? '');
		setSlug(category.slug ?? '');
		setDescription(category.description ?? '');
		setIcon_img_url(category.icon_img_url ?? '');
		setDisplay_img_url(category.display_img_url ?? '');
		setQuantite(category.quantite ?? '');
		setCategory_id(category.category_id ?? '');
		
    }
    const emptyCategory = () => {
        setId('');
        setNom('');
		setSlug('');
		setDescription('');
		setIcon_img_url('');
		setDisplay_img_url('');
		setQuantite('');
		setCategory_id('');
		
    }

    return {
        id,
        nom,
		slug,
		description,
		icon_img_url,
		display_img_url,
		quantite,
		category_id,
		
        errors,
        isDisabled,
        setNom,
		setSlug,
		setDescription,
		setIcon_img_url,
		setDisplay_img_url,
		setQuantite,
		setCategory_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getCategory,
        createCategory,
        updateCategory,
        deleteCategory,
        fillCategory,
        emptyCategory
    };
}