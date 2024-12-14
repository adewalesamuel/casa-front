import { useState } from 'react';
import { Services } from '../services';

export const useTransaction = () => {
    const [id, setId] = useState('');
	const [amount, setAmount] = useState('');
	const [type, setType] = useState('');
	const [author, setAuthor] = useState('');
	const [description, setDescription] = useState('');
	const [account_id, setAccount_id] = useState('');
	
    const [errors, setErrors] = useState([]);
    const [isDisabled, setIsDisabled] = useState(false);

    const getTransaction = (transactionId, signal) => {        
        return Services.TransactionService.getById(transactionId, signal)
        .then(response => {
            fillTransaction(response.transaction);
            setIsDisabled(false);

            return response;
        });
    }

    const createTransaction = signal => {
        const payload = {
            amount,
		type,
		author,
		description,
		account_id,
		
        };

        return Services.TransactionService.create(
        JSON.stringify(payload), signal);
    }
    const updateTransaction = (transactionId, signal) => {
        const payload = {
            amount,
		type,
		author,
		description,
		account_id,
		
        };

        return Services.TransactionService.update(
        	transactionId, JSON.stringify(payload), signal);
    }
    const deleteTransaction = (transactionId, signal) => {
        return Services.TransactionService.destroy(transactionId, signal);
    }
    const fillTransaction = (transaction) => {
        setId(transaction.id);
        setAmount(transaction.amount ?? '');
		setType(transaction.type ?? '');
		setAuthor(transaction.author ?? '');
		setDescription(transaction.description ?? '');
		setAccount_id(transaction.account_id ?? '');
		
    }
    const emptyTransaction = () => {
        setId('');
        setAmount('');
		setType('');
		setAuthor('');
		setDescription('');
		setAccount_id('');
		
    }

    return {
        id,
        amount,
		type,
		author,
		description,
		account_id,
		
        errors,
        isDisabled,
        setAmount,
		setType,
		setAuthor,
		setDescription,
		setAccount_id,
		
        setId,
        setErrors,
        setIsDisabled,
        getTransaction,
        createTransaction,
        updateTransaction,
        deleteTransaction,
        fillTransaction,
        emptyTransaction
    };
}