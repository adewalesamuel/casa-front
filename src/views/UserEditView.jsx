//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';
import { Utils } from '../utils';

export function UserEditView() {
    let abortController = new AbortController();

    const {id} = useParams();

    const useUser = Hooks.useUser();

    
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useUser.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            const {user} = await useUser.updateUser(abortController.signal);
            Utils.Auth.setUser(user);
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useUser.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useUser.setIsDisabled(true);

        try {
            useUser.fillUser(Utils.Auth.getUser())
        } catch (error) {
            console.log(error);
        } finally{
            useUser.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3 className='d-none d-md-block'>Modifier mes informations</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.UserForm useUser={useUser}
            isDisabled={useUser.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
