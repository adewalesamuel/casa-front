//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Utils } from '../utils';

export function UserListView() {
    let abortController = new AbortController();

    const { UserService } = Services;

    const tableAttributes = {
        'nom': {},
		'email': {},
		'password': {},
		'profile_img_url': {},
		'genre': {},
		'adresse': {},
		'numero_telephone': {},
		'numero_whatsapp': {},
		'numero_telegram': {},
		'company_name': {},
		'company_logo_url': {},
		'type': {},
		'api_token': {},
		'is_active': {},
		'is_company': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [page, ] = useState(1);
    const [, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/users/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, user) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce user')) {
            const usersCopy = [...users];
            const index = usersCopy.findIndex(userItem => 
                userItem.id === user.id);

            usersCopy.splice(index, 1);
            setUsers(usersCopy);

            await UserService.destroy(user.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {users} = await UserService.getAll(
                {page: page}, abortController.signal);

            setUsers(users.data);
            setPageLength(users.last_page);
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
    }, [init])

    return (
        <>
            <h6>Liste Users</h6>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/users/create'>
                    <i className='icon ion-plus'></i> Créer user
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={users}/>
            </Components.Loader>
        </>
    )
}
