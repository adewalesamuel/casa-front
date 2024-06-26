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

    const [categorys, setCategorys] = useState([]);
	const [municipalitys, setMunicipalitys] = useState([]);
	const [users, setUsers] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useProduct.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useProduct.createProduct(abortController.signal);

            navigate('/products');
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
            const { categorys } = await Services.CategoryService
			.getAll(abortController.signal);
			setCategorys(categorys);

			const { municipalitys } = await Services.MunicipalityService
			.getAll(abortController.signal);
			setMunicipalitys(municipalitys);

			const { users } = await Services.UserService
			.getAll(abortController.signal);
			setUsers(users);

			
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
            <h3>Créer Product</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.ProductForm useProduct={useProduct}
            categorys={categorys} setCategorys={setCategorys}
			municipalitys={municipalitys} setMunicipalitys={setMunicipalitys}
			users={users} setUsers={setUsers}
			isDisabled={useProduct.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
