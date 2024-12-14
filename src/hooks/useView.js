import { useState } from 'react';
import { Services } from '../services';

export const useView = () => {
    const [id, setId] = useState('');
	const [product_id, setProduct_id] = useState('');
	const [user_id, setUser_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getView = (viewId, signal) => {        
        return Services.ViewService.getById(viewId, signal)
        .then(response => {
            fillView(response.view);
            setIsDisabled(false);

            return response;
        });
    }

    const createView = signal => {
        const payload = {
            product_id,
		user_id,
		
        };

        return Services.ViewService.create(
        JSON.stringify(payload), signal);
    }
    const updateView = (viewId, signal) => {
        const payload = {
            product_id,
		user_id,
		
        };

        return Services.ViewService.update(
        	viewId, JSON.stringify(payload), signal);
    }
    const deleteView = (viewId, signal) => {
        return Services.ViewService.destroy(viewId, signal);
    }
    const fillView = (view) => {
        setId(view.id);
        setProduct_id(view.product_id ?? '');
		setUser_id(view.user_id ?? '');
		
    }
    const emptyView = () => {
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
        getView,
        createView,
        updateView,
        deleteView,
        fillView,
        emptyView
    };
}