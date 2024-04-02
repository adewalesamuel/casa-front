//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function PromoCodeCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const usePromoCode = Hooks.usePromoCode();

    const [users, setUsers] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        usePromoCode.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await usePromoCode.createPromoCode(abortController.signal);

            navigate('/promo-codes');
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            usePromoCode.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        usePromoCode.setIsDisabled(true);

        try {
            const { users } = await Services.UserService
			.getAll(abortController.signal);
			setUsers(users);

			
        } catch (error) {
            console.log(error);
        } finally {
            usePromoCode.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer PromoCode</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.PromoCodeForm usePromoCode={usePromoCode}
            users={users} setUsers={setUsers}
			isDisabled={usePromoCode.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
