//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Components } from '../components';
import { Hooks } from '../hooks';
import { useParams } from 'react-router-dom';
import { Services } from '../services';

export function CommentEditView() {
    let abortController = new AbortController();

    const {id} = useParams();

    const useComment = Hooks.useComment();

    const [products, setProducts] = useState([]);
	const [users, setUsers] = useState([]);
	
    const [errorMessages, setErrorMessages] = useState([]);

    const handleFormSubmit = async e => {
        e.preventDefault();
        useComment.setIsDisabled(true);
        setErrorMessages([]);
        
        try {
            await useComment.updateComment(
            	id, abortController.signal);
        } catch (error) {
            if ('message' in error) setErrorMessages([error.message]);
            if (!('messages' in error)) return;

            const messages = await error.messages;

            setErrorMessages(messages);
        } finally {
            useComment.setIsDisabled(false);
        }
    }

    const init = useCallback(async () => {
        useComment.setIsDisabled(true);

        try {
            await useComment.getComment(id, abortController.signal);
            
            const { products } = await Services.ProductService
			.getAll(abortController.signal);
			setProducts(products);

			const { users } = await Services.UserService
			.getAll(abortController.signal);
			setUsers(users);

			
        } catch (error) {
            console.log(error);
        } finally{
            useComment.setIsDisabled(false);
        }
    }, [])

    useEffect(() => {
        init();
    }, [init])

    return (
        <>
            <h3>Modifier Comment</h3>

            <Components.ErrorMessages>
                {errorMessages}
            </Components.ErrorMessages>
            <Components.CommentForm useComment={useComment}
            products={products} setProducts={setProducts}
			users={users} setUsers={setUsers}
			isDisabled={useComment.isDisabled} handleFormSubmit={handleFormSubmit}/>
        </>
    )
}
