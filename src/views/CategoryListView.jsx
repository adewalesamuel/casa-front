
//'use client'
import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import * as Icons from 'react-feather';
import { Services } from '../services';
import { Components } from '../components';

export function CategoryListView() {
    let abortController = new AbortController();

    const { CategoryService, ProductService } = Services;
    
    const [searchParam] = useSearchParams();

    const [categories, setCategories] = useState([]);
    const [productList, setProductList] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    const loadProductList = async (page) => {
        setIsLoading(true);

        try {
            const {products} = await ProductService.loadProductList(
                page, searchParam.get('category'), abortController.signal);
            
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
            const {categories} = await CategoryService.getAll(
                {}, abortController.signal);

            setCategories(categories);
        } catch (error) {
            console.log(error);
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
        setIsLoading(true);
        setHasMore(true);
        setPage(1)
        loadProductList(1);

        return () => {
            abortController.abort();
            abortController = new AbortController();
        }
    }, [searchParam.get('category')])

    useEffect(() => {
        if (page === 1) return;
        loadProductList(page);
    }, [page]);

    return (
        <section id="category">
            <div className="">
                <ul className="row list-unstyled py-3 pb-4 m-0 text-nowrap 
                mw-100 overflow-auto justify-content-left flex-nowrap">
                    {categories.map((categorie, index) => {
                        const isCurrentCaterory = (searchParam.get('category') && 
                                                    searchParam.get('category') === categorie.slug);
                        return (
                                <li className="px-md-2 px-1" key={index}>
                                    <Link className="btn btn-info" 
                                    to={`/categories?category=${categorie.slug}`} 
                                    style={{opacity: `${isCurrentCaterory ? 1 : 0.6}`}}>
                                        {categorie?.nom ?? '---'}
                                    </Link>
                                </li>
                            )
                    })}
                </ul>
            </div>
            <div className="py-3">
                <ul className="list-unstyled mb-0 row">
                    {productList.map((product, index) => {
                        return (
                                <li className="col-lg-6 col-12 px-md-2 px-0 pb-3" key={index}>
                                    <Components.ProductCardH product={product} />
                                </li>
                            )
                    })}
                </ul>
                <div className='text-center py-5'>
                    {isLoading && <Components.Spinner />}
                    {(!isLoading && hasMore) &&
                        <button className='btn btn-info btn-sm' onClick={() => setPage(page + 1)}>
                            <Icons.PlusCircle /> Charger plus
                        </button>
                    }
                </div>
            </div>
        </section>
    )
}
