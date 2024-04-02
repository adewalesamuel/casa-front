//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Utils } from '../utils';

export function FeatureListView() {
    let abortController = new AbortController();

    const { FeatureService } = Services;

    const tableAttributes = {
        'nom': {},
		'slug': {},
		'icon_img_url': {},
		'display_img_url': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [features, setFeatures] = useState([]);
    const [page, ] = useState(1);
    const [, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/features/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, feature) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce feature')) {
            const featuresCopy = [...features];
            const index = featuresCopy.findIndex(featureItem => 
                featureItem.id === feature.id);

            featuresCopy.splice(index, 1);
            setFeatures(featuresCopy);

            await FeatureService.destroy(feature.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {features} = await FeatureService.getAll(
                {page: page}, abortController.signal);

            setFeatures(features.data);
            setPageLength(features.last_page);
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
            <h6>Liste Features</h6>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/features/create'>
                    <i className='icon ion-plus'></i> Créer feature
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={features}/>
            </Components.Loader>
        </>
    )
}
