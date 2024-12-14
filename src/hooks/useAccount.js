import { useState } from 'react';
import { Services } from '../services';

export const useAccount = () => {
    const [id, setId] = useState('');
	const [is_active, setIs_active] = useState('');
	const [user_id, setUser_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getAccount = (accountId, signal) => {        
        return Services.AccountService.getById(accountId, signal)
        .then(response => {
            fillAccount(response.account);
            setIsDisabled(false);

            return response;
        });
    }

    const createAccount = signal => {
        const payload = {
            is_active,
		user_id,
		
        };

        return Services.AccountService.create(
        JSON.stringify(payload), signal);
    }
    const updateAccount = (accountId, signal) => {
        const payload = {
            is_active,
		user_id,
		
        };

        return Services.AccountService.update(
        	accountId, JSON.stringify(payload), signal);
    }
    const deleteAccount = (accountId, signal) => {
        return Services.AccountService.destroy(accountId, signal);
    }
    const fillAccount = (account) => {
        setId(account.id);
        setIs_active(account.is_active ?? '');
		setUser_id(account.user_id ?? '');
		
    }
    const emptyAccount = () => {
        setId('');
        setIs_active('');
		setUser_id('');
		
    }

    return {
        id,
        is_active,
		user_id,
		
        errors,
        isDisabled,
        setIs_active,
		setUser_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getAccount,
        createAccount,
        updateAccount,
        deleteAccount,
        fillAccount,
        emptyAccount
    };
}