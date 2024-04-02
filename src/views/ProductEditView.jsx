//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';

export function ProductEditView() {
    let abortController = new AbortController();

    const {id} = useParams();

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
            await useProduct.updateProduct(
            	id, abortController.signal);
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
            await useProduct.getProduct(id, abortController.signal);
            
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
        } finally{
            useProduct.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3>Modifier Product</h3>

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
