//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { Plus } from 'react-feather';

export function UserProductListView() {
    let abortController = new AbortController();

    const { ProductService } = Services;

    const tableAttributes = {
        '#': {},
        'nom': {},
		'prix': {},
		'type_paiement': {},
		'type': {},
		'category_id': {},
		'municipality_id': {},
		
    }
    const tableActions = ['edit', 'delete'];
    
    const navigate = useNavigate();
    const [searchParams,] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageLength, setPageLength] = useState(1);
    const [isLoading, setIsLoading] = useState(true);

    const handleEditClick = (e, data) => {
        e.preventDefault();
        navigate(`../mes-publications/${data.id}/edit`);
    }
    const handleDeleteClick = async (e, product) => {
        e.preventDefault();

        if (confirm('Voulez vous vraiment supprimer ce product')) {
            const productsCopy = [...products];
            const index = productsCopy.findIndex(productItem => 
                productItem.id === product.id);

            productsCopy.splice(index, 1);
            setProducts(productsCopy);

            await ProductService.destroy(product.id, 
                abortController.signal);
        }
    }

    const init = useCallback(async () => {
        try {
            const {products} = await ProductService.getByUser(
                {page: page}, abortController.signal);

            const productData = products.data.map((product, index) => {
                return {
                    '#': (products.data.length * (page - 1)) + (index + 1),
                    ...product,
                    category_id: product?.category?.nom ?? "",
                    municipality_id: product?.municipality?.nom ?? "",
                }
            })
            setProducts(productData);
            setPageLength(products.last_page);
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
                <h4>Mes publications</h4>
                <Link className='btn btn-info' to='../mes-publications/create'>
                    <Plus /> Ajouter
                </Link>
            </div>
            <Components.Loader isLoading={isLoading}>
                <Components.Table controllers={{handleEditClick, handleDeleteClick}} 
                tableAttributes={tableAttributes} tableActions={tableActions} 
                tableData={products}/>
 
                <Components.Pagination page={page} pageLength={pageLength}/>
            </Components.Loader>
        </>
    )
}
