//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';

export function FavoriteEditView() {
    let abortController = new AbortController();

    const {id} = useParams();

    const useFavorite = Hooks.useFavorite();

    const [products, setProducts] = useState([]);
	const [users, setUsers] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useFavorite.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useFavorite.updateFavorite(
            	id, abortController.signal);
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useFavorite.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useFavorite.setIsDisabled(true);

        try {
            await useFavorite.getFavorite(id, abortController.signal);
            
            const { products } = await Services.ProductService
			.getAll(abortController.signal);
			setProducts(products);

			const { users } = await Services.UserService
			.getAll(abortController.signal);
			setUsers(users);

			
        } catch (error) {
            console.log(error);
        } finally{
            useFavorite.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3>Modifier Favorite</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.FavoriteForm useFavorite={useFavorite}
            products={products} setProducts={setProducts}
			users={users} setUsers={setUsers}
			isDisabled={useFavorite.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
