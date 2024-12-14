//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { useError } from '../hooks/useError';
import { CreditCard } from 'react-feather';
import { Hooks } from '../hooks';
import { Utils } from '../utils';

export function TransactionListView() {
    let abortController = new AbortController();
    const {parsePrice} = Utils.String;

    const { TransactionService, AccountService } = Services;

    const useTransaction = Hooks.useTransaction();

    const tableAttributes = {
        'amount': {},
		'type': {},
		'created_at': {},
		
    }
    const tableActions = [];
    
    const [searchParams] = useSearchParams();
    const errorHandler = useError();

    const [transactions, setTransactions] = useState([]);
    const [analytics, setAnalytics] = useState({});
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);


	const onSuccessCallback = async () => {
        useTransaction.setIsDisabled(true);

        try {
            const transaction = await useTransaction.createTransaction(
                abortController.signal);

            appendTransaction(transaction);
            alert(`Votre compte à bien été recharger de ${parsePrice(useTransaction.amount)}`);
        } catch (error) {
            errorHandler.setError(error);
        } finally {
            useTransaction.setIsDisabled(false);
        }
    };
	const onErrorCallback = (error) => {
        alert(`Une erreur est survenue. Veuillez réessayer plus tard`);
        errorHandler.setError(error)
    };

    const parseDate = date => {
        return `${date.toLocaleDateString('fr')} à ${date.toLocaleTimeString('fr')}`;
    }

    const appendTransaction = (transaction) => {
        const transactionCopy = [...transactions];
        transaction.amount = parsePrice(transaction.amount);
        transaction.created_at = parseDate(new Date(transaction.created_at));

        transactionCopy.unshift(transaction);
        setTransactions(transactionCopy);
    }

    const handleTransactionSubmit = (e) => {
        e.preventDefault();
        setIsModalOpen(false);

        try {
            const userInfo = `${Utils.Auth.getUser().nom} - ${Utils.Auth.getUser().email}`;
            Utils.Payment.checkout(
                {
                    amount: useTransaction.amount,
                    description: `Rechargement compte vendeur : ${userInfo}}`
                },
                onSuccessCallback,
                onErrorCallback
            );
        } catch (error) {
            errorHandler.setError(error);
        }
    }

    const init = useCallback(async () => {
        try {
            useTransaction.setAmount(2000);
            useTransaction.setAuthor('self');
            useTransaction.setType('credit');
            
            const analytics = await AccountService.getAnalytics(abortController.signal);
            setAnalytics(analytics);

            const {transactions} = await TransactionService.getAll(
                {page: page}, abortController.signal);
            const transactionData = transactions.data.map(transaction => {
                return {
                    'amount': parsePrice(transaction.amount),
                    'type': transaction.type,
                    'created_at': parseDate(new Date(transaction.created_at)),
                }
            })

            setTransactions(transactionData);
            setPageLength(transactions.last_page);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [page]);

    useEffect(() => {
        init();

        return () => {
            abortController.abort();
            abortController = new AbortController();
        }
    }, [init]);

    useEffect(() => {
        if (!searchParams.get('page')) return;

        setPage(searchParams.get('page'));
    }, [searchParams.get('page')]);

    return (
        <>
            <Components.ErrorMessages>
                {errorHandler.errorMessages}
            </Components.ErrorMessages>
            <div className='d-flex justify-content-between align-items-center mb-3'>
                <h4>Mon compte</h4>
                <button className='btn btn-info' to='../mes-publications/create' 
                onClick={() => setIsModalOpen(true)}>
                    <CreditCard size={22} className='mr-1'/> Recharger
                </button>
            </div>
            <div className='row mb-3'>
                <div className='col'>
                    <div className='card'>
                        <div className='card-body'>
                            <CreditCard size={26} className='text-info mb-2'/>
                            <h5>Trésorerie</h5>
                            <h1 className='text-info'>{analytics.current_balance ?? '__'}</h1>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='card'>
                        <div className='card-body'>
                            <CreditCard size={26} className='text-success mb-2'/>
                            <h5>Total crédits</h5>
                            <h1 className='text-success'>{analytics.credit_sum ?? '__'}</h1>
                        </div>
                    </div>
                </div>
                <div className='col'>
                    <div className='card'>
                        <div className='card-body'>
                            <CreditCard size={26} className='text-warning mb-2'/>
                            <h5>Total dépenses</h5>
                            <h1 className='text-warning'>{analytics.debit_sum ?? '__'}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <h5>Liste des transactions</h5>
            <Components.Loader isLoading={isLoading}>
                <Components.Table controllers={{}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={transactions}/>

                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
            
            {isModalOpen && 
                <Components.Modal title="Recharger mon compte" 
                handleModalClose={() => setIsModalOpen(false)}>
                    <Components.TransactionForm useTransaction={useTransaction} 
                    isDisabled={useTransaction.isDisabled} handleFormSubmit={handleTransactionSubmit}/>
                </Components.Modal>
            }
        </>
    )
}
