//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Utils } from '../utils';

export function FeatureProductListView() {
    let abortController = new AbortController();

    const { FeatureProductService } = Services;

    const tableAttributes = {
        'feature_id': {},
		'product_id': {},
		'quantite': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();

    const [feature_products, setFeatureProducts] = useState([]);
    const [page, ] = useState(1);
    const [, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`/feature-products/${data.id}/edit`);
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
            const {feature_products} = await FeatureProductService.getAll(
                {page: page}, abortController.signal);

            setFeatureProducts(feature_products.data);
            setPageLength(feature_products.last_page);
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
            <h6>Liste FeatureProducts</h6>
            <Components.Loader isLoading={isLoading}>
                <Link className='btn btn-info' to='/feature-products/create'>
                    <i className='icon ion-plus'></i> Créer feature_product
                </Link>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={feature_products}/>
            </Components.Loader>
        </>
    )
}
