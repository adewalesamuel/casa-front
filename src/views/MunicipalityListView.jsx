//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Utils } from '../utils';

export function MunicipalityListView() {
    let abortController = new AbortController();

    const { MunicipalityService } = Services;

    const tableAttributes = {
        'nom': {},
		'slug': {},
		'city_id': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [municipalitys, setMunicipalitys] = useState([]);
    const [page, ] = useState(1);
    const [, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/municipalitys/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, municipality) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce municipality')) {
            const municipalitysCopy = [...municipalitys];
            const index = municipalitysCopy.findIndex(municipalityItem => 
                municipalityItem.id === municipality.id);

            municipalitysCopy.splice(index, 1);
            setMunicipalitys(municipalitysCopy);

            await MunicipalityService.destroy(municipality.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {municipalitys} = await MunicipalityService.getAll(
                {page: page}, abortController.signal);

            setMunicipalitys(municipalitys.data);
            setPageLength(municipalitys.last_page);
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
            <h6>Liste Municipalitys</h6>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/municipalitys/create'>
                    <i className='icon ion-plus'></i> Créer municipality
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={municipalitys}/>
            </Components.Loader>
        </>
    )
}
