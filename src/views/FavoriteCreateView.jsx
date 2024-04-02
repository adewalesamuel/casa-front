//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function FavoriteCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useFavorite = Hooks.useFavorite();

    const [products, setProducts] = useState([]);
	const [users, setUsers] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useFavorite.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useFavorite.createFavorite(abortController.signal);

            navigate('/favorites');
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
            const { products } = await Services.ProductService
			.getAll(abortController.signal);
			setProducts(products);

			const { users } = await Services.UserService
			.getAll(abortController.signal);
			setUsers(users);

			
        } catch (error) {
            console.log(error);
        } finally {
            useFavorite.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h3>Créer Favorite</h3>

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
