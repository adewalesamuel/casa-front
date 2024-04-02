import { useState } from 'react';
import { Services } from '../services';

export const useFavorite = () => {
    const [id, setId] = useState('');
	const [product_id, setProduct_id] = useState('');
	const [user_id, setUser_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getFavorite = (favoriteId, signal) => {        
        return Services.FavoriteService.getById(favoriteId, signal)
        .then(response => {
            fillFavorite(response.favorite);
            setIsDisabled(false);

            return response;
        });
    }

    const createFavorite = signal => {
        const payload = {
            product_id,
		user_id,
		
        };

        return Services.FavoriteService.create(
        JSON.stringify(payload), signal);
    }
    const updateFavorite = (favoriteId, signal) => {
        const payload = {
            product_id,
		user_id,
		
        };

        return Services.FavoriteService.update(
        	favoriteId, JSON.stringify(payload), signal);
    }
    const deleteFavorite = (favoriteId, signal) => {
        return Services.FavoriteService.destroy(favoriteId, signal);
    }
    const fillFavorite = (favorite) => {
        setId(favorite.id);
        setProduct_id(favorite.product_id ?? '');
		setUser_id(favorite.user_id ?? '');
		
    }
    const emptyFavorite = () => {
        setId('');
        setProduct_id('');
		setUser_id('');
		
    }

    return {
        id,
        product_id,
		user_id,
		
        errors,
        isDisabled,
        setProduct_id,
		setUser_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getFavorite,
        createFavorite,
        updateFavorite,
        deleteFavorite,
        fillFavorite,
        emptyFavorite
    };
}