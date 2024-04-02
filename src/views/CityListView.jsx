//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Utils } from '../utils';

export function CityListView() {
    let abortController = new AbortController();

    const { CityService } = Services;

    const tableAttributes = {
        'nom': {},
		'slug': {},
		'region_id': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [citys, setCitys] = useState([]);
    const [page, ] = useState(1);
    const [, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/citys/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, city) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce city')) {
            const citysCopy = [...citys];
            const index = citysCopy.findIndex(cityItem => 
                cityItem.id === city.id);

            citysCopy.splice(index, 1);
            setCitys(citysCopy);

            await CityService.destroy(city.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {citys} = await CityService.getAll(
                {page: page}, abortController.signal);

            setCitys(citys.data);
            setPageLength(citys.last_page);
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
            <h6>Liste Citys</h6>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/citys/create'>
                    <i className='icon ion-plus'></i> Créer city
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={citys}/>
            </Components.Loader>
        </>
    )
}
