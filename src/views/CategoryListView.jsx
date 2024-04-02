//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Utils } from '../utils';

export function CategoryListView() {
    let abortController = new AbortController();

    const { CategoryService } = Services;

    const tableAttributes = {
        'nom': {},
		'slug': {},
		'description': {},
		'icon_img_url': {},
		'display_img_url': {},
		'quantite': {},
		'category_id': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [categorys, setCategorys] = useState([]);
    const [page, ] = useState(1);
    const [, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/categorys/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, category) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce category')) {
            const categorysCopy = [...categorys];
            const index = categorysCopy.findIndex(categoryItem => 
                categoryItem.id === category.id);

            categorysCopy.splice(index, 1);
            setCategorys(categorysCopy);

            await CategoryService.destroy(category.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {categorys} = await CategoryService.getAll(
                {page: page}, abortController.signal);

            setCategorys(categorys.data);
            setPageLength(categorys.last_page);
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
            <h6>Liste Categorys</h6>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/categorys/create'>
                    <i className='icon ion-plus'></i> Créer category
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={categorys}/>
            </Components.Loader>
        </>
    )
}
