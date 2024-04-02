//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';

export function PromoCodeEditView() {
    let abortController = new AbortController();

    const {id} = useParams();

    const usePromoCode = Hooks.usePromoCode();

    const [users, setUsers] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        usePromoCode.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await usePromoCode.updatePromoCode(
            	id, abortController.signal);
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
            await usePromoCode.getPromoCode(id, abortController.signal);
            
            const { users } = await Services.UserService
			.getAll(abortController.signal);
			setUsers(users);

			
        } catch (error) {
            console.log(error);
        } finally{
            usePromoCode.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3>Modifier PromoCode</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.PromoCodeForm usePromoCode={usePromoCode}
            users={users} setUsers={setUsers}
			isDisabled={usePromoCode.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
