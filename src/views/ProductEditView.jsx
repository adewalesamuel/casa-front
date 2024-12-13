//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import  { Views } from '../views';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';

export function ProductEditView() {
    let abortController = new AbortController();

    const {id} = useParams();

    const useProduct = Hooks.useProduct();

    const [categories, setCategories] = useState([]);
	const [municipalities, setMunicipalities] = useState([]);
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
            const {product} = await Services.ProductService.getById(id, abortController.signal);
            useProduct.fillProduct(product);
            
            const { categories } = await Services.CategoryService
			.getAll(abortController.signal);
			setCategories(categories);

			const { municipalities } = await Services.MunicipalityService
			.getAll(abortController.signal);
			setMunicipalities(municipalities);
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
            <h3>Modifier la publication</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.ProductForm useProduct={useProduct}
            categories={categories} setCategories={setCategories}
			municipalities={municipalities} setMunicipalities={setMunicipalities}
			users={users} setUsers={setUsers}
			isDisabled={useProduct.isDisabled} handleFormSubmit={handleFormSubmit}/>
            <div className="row mt-4">
                <div className="col-12 col-lg-8">
                    <Routes>
                        <Route path='' element={<Views.FeatureProductListView />}/>
                        <Route path='features/create' element={<Views.FeatureProductCreateView />}/>
                        <Route path='features/:featureId/edit' element={<Views.FeatureProductEditView />}/>
                    </Routes>    
                </div>
            </div>
        </>
    )
}
