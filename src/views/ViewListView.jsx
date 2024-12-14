//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { useError } from '../hooks/useError';

export function ViewListView() {
    let abortController = new AbortController();

    const { ViewService } = Services;

    const tableAttributes = {
        'product_id': {},
		'user_id': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const errorHandler = useError();

    const [views, setViews] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/views/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, view) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce view')) {
            const viewsCopy = [...views];
            const index = viewsCopy.findIndex(viewItem => 
                viewItem.id === view.id);

            viewsCopy.splice(index, 1);
            setViews(viewsCopy);

            await ViewService.destroy(view.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {views} = await ViewService.getAll(
                {page: page}, abortController.signal);

            setViews(views.data);
            setPageLength(views.last_page);
        } catch (error) {
            errorHandler.setError(error); 
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
            <h6>Liste Views</h6>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/views/create'>
                    <i className='icon ion-plus'></i> Créer view
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={views}/>

                <Components.Pagination pageLength={pageLength} page={parseInt(page)} />
            </Components.Loader>
        </>
    )
}
