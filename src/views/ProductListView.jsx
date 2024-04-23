//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Services } from '../services';
import { Components } from '../components';
import { useSearchParams } from 'react-router-dom';

export function ProductListView() {
    let abortController = new AbortController();

    const { ProductService } = Services;

    const [searchParams, ] = useSearchParams();

    const [productList, setProductList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSearch, ] = useState((searchParams.get('municipality_id') || searchParams.get('nom')) ? true : false);
    const [page, setPage] = useState(isSearch ? '' : 1);
    const [hasMore, setHasMore] = useState(!isSearch);

    const loadProductList = async (page) => {
        setIsLoading(true);
        
        try {
            const {products} = await Services.ProductService
            .loadProductList(page, null, abortController.signal);

            if (products.data.length === 0) setHasMore(false);
            if (page === 1) return setProductList([...products.data]);

            setProductList([...productList, ...products.data]);
        } catch(error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const init = useCallback(async () => {
        setIsLoading(true);
        try {
            const {products} = await ProductService.getAll({
                page: isSearch ? '' : 1, 
                municipality_id: searchParams.get('municipality_id'),
                nom: searchParams.get('nom'),
            }, abortController.signal);

            if ('data' in products) return setProductList(products.data)

            setProductList(products);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [searchParams.get('municipality_id'), searchParams.get('nom')]);

    useEffect(() => {
        init();

        return () => {
            abortController.abort();
            abortController = new AbortController();
        }
    }, [init])

    useEffect(() => {
        if (page === '' || page === 1) return;
        loadProductList(page)
    }, [page]);

    return (
        <section id="productList">
            <div className="col-12">
                    <ul className="list-unstyled mb-0 row">
                        {productList.map((product, index) => {
                            return (
                                    <li className="col-lg-6 col-12 px-md-2 px-0 pb-3" key={index}>
                                        <Components.ProductCardH product={product} />
                                    </li>
                                )
                        })}
                    </ul>
                </div>
                <Components.HasMore isLoading={isLoading} page={page} 
                    setPage={setPage} hasMore={hasMore}/>
        </section>
    )
}
