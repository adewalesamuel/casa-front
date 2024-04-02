import { useState } from 'react';
import { Services } from '../services';

export const usePromoCode = () => {
    const [id, setId] = useState('');
	const [code, setCode] = useState('');
	const [expiration_date, setExpiration_date] = useState('');
	const [type, setType] = useState('');
	const [user_id, setUser_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getPromoCode = (promo_codeId, signal) => {        
        return Services.PromoCodeService.getById(promo_codeId, signal)
        .then(response => {
            fillPromoCode(response.promo_code);
            setIsDisabled(false);

            return response;
        });
    }

    const createPromoCode = signal => {
        const payload = {
            code,
		expiration_date,
		type,
		user_id,
		
        };

        return Services.PromoCodeService.create(
        JSON.stringify(payload), signal);
    }
    const updatePromoCode = (promo_codeId, signal) => {
        const payload = {
            code,
		expiration_date,
		type,
		user_id,
		
        };

        return Services.PromoCodeService.update(
        	promo_codeId, JSON.stringify(payload), signal);
    }
    const deletePromoCode = (promo_codeId, signal) => {
        return Services.PromoCodeService.destroy(promo_codeId, signal);
    }
    const fillPromoCode = (promo_code) => {
        setId(promo_code.id);
        setCode(promo_code.code ?? '');
		setExpiration_date(promo_code.expiration_date ?? '');
		setType(promo_code.type ?? '');
		setUser_id(promo_code.user_id ?? '');
		
    }
    const emptyPromoCode = () => {
        setId('');
        setCode('');
		setExpiration_date('');
		setType('');
		setUser_id('');
		
    }

    return {
        id,
        code,
		expiration_date,
		type,
		user_id,
		
        errors,
        isDisabled,
        setCode,
		setExpiration_date,
		setType,
		setUser_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getPromoCode,
        createPromoCode,
        updatePromoCode,
        deletePromoCode,
        fillPromoCode,
        emptyPromoCode
    };
}