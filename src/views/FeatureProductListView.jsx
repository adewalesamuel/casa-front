//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Plus } from 'react-feather';


export function FeatureProductListView() {
    let abortController = new AbortController();

    const { FeatureProductService } = Services;

    const {id} = useParams();

    const tableAttributes = {
        'nom': {},
		'quantite': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams,] = useSearchParams();

    const [feature_products, setFeatureProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`features/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, feature_product) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce feature_product')) {
            const feature_productsCopy = [...feature_products];
            const index = feature_productsCopy.findIndex(feature_productItem => 
                feature_productItem.id === feature_product.id);

            feature_productsCopy.splice(index, 1);
            setFeatureProducts(feature_productsCopy);

            await FeatureProductService.destroy(feature_product.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {features} = await FeatureProductService
            .getByProductId(id, abortController.signal);
            const featuresCopy = features.map(feature => {
                return {
                    id: feature.pivot.id,
                    nom: feature.nom,
                    quantite: feature.pivot.quantite
                }
            });

            setFeatureProducts(featuresCopy);
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

    useEffect(() => {
        if (searchParams.get('page')) 
            setPage(parseInt(searchParams.get('page')))
    }, [searchParams.get('page')])

    return (
        <>
            <div className='d-flex justify-content-between align-items-center mb-2'>
                <h4>Charactéristiques</h4>
                <Link className='btn btn-info' to={`./features/create`}>
                    <Plus /> Ajouter
                </Link>
            </div>

            <Components.Loader isLoading={isLoading}>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={feature_products}/>
 
                <Components.Pagination page={page} pageLength={pageLength}/>
            </Components.Loader>
        </>
    )
}
