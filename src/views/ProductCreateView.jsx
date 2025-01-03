//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Hooks } from '../hooks';

export function ProductCreateView() {
    let abortController = new AbortController();

    const navigate = useNavigate();

    const useProduct = Hooks.useProduct();

    const [categories, setCategorys] = useState([]);
	const [municipalities, setMunicipalitys] = useState([]);
	const [users, setUsers] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useProduct.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useProduct.createProduct(abortController.signal);

            navigate('/mon-profil/mes-publications');
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useProduct.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useProduct.setIsDisabled(true);

        try {
            const { categories } = await Services.CategoryService
			.getAll(abortController.signal);
			setCategorys(categories);

			const { municipalities } = await Services.MunicipalityService
			.getAll(abortController.signal);
			setMunicipalitys(municipalities);
        } catch (error) {
            console.log(error);
        } finally {
            useProduct.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init()
    }, [init])

    return (
        <>
            <h4>Nouvelle publication</h4>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.ProductForm useProduct={useProduct}
            categories={categories} setCategorys={setCategorys}
			municipalities={municipalities} setMunicipalitys={setMunicipalitys}
			users={users} setUsers={setUsers}isDisabled={useProduct.isDisabled} 
            handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
