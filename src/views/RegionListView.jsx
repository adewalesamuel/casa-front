//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Utils } from '../utils';

export function RegionListView() {
    let abortController = new AbortController();

    const { RegionService } = Services;

    const tableAttributes = {
        'nom': {},
		'slug': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [regions, setRegions] = useState([]);
    const [page, ] = useState(1);
    const [, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/regions/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, region) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce region')) {
            const regionsCopy = [...regions];
            const index = regionsCopy.findIndex(regionItem => 
                regionItem.id === region.id);

            regionsCopy.splice(index, 1);
            setRegions(regionsCopy);

            await RegionService.destroy(region.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {regions} = await RegionService.getAll(
                {page: page}, abortController.signal);

            setRegions(regions.data);
            setPageLength(regions.last_page);
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
            <h6>Liste Regions</h6>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/regions/create'>
                    <i className='icon ion-plus'></i> Créer region
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={regions}/>
            </Components.Loader>
        </>
    )
}
