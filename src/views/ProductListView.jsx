//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Services } from '../services';
import { Components } from '../components';
import * as Icons from 'react-feather';

export function ProductListView() {
    let abortController = new AbortController();

    const { ProductService } = Services;

    const [productList, setProductList] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

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
        try {
            const {products} = await ProductService.getAll(
                {page: 1}, abortController.signal);

            setProductList(products.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        init();

        return () => {
            abortController.abort();
            abortController = new AbortController();
        }
    }, [init])

    useEffect(() => {
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
                <div className='text-center py-5'>
                    {isLoading && <Components.Spinner />}
                    {(!isLoading && hasMore) &&
                        <button className='btn btn-info btn-sm' onClick={() => setPage(page + 1)}>
                            <Icons.PlusCircle /> Charger plus
                        </button>
                    }
                </div>
        </section>
    )
}
