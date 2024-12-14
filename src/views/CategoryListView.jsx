
//'use client'
import { useCallback, useEffect, useState, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Services } from '../services';
import { Components } from '../components';
import { MainContext } from '../App';

export function CategoryListView() {
    let abortController = new AbortController();

    const { CategoryService, ProductService } = Services;
    
    const {IM_categories, setIM_categories} = useContext(MainContext);
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
            if (IM_categories.length === 0) {
                const {categories} = await CategoryService.getAll(
                    {}, abortController.signal);

                setCategories(categories)
                setIM_categories(categories)

                return;
            }
            
            setCategories(IM_categories);
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
                <ul className="row list-unstyled py-3 m-0 text-nowrap 
                mw-100 overflow-auto justify-content-left flex-nowrap hide-scroll-bar">
                    {categories.map((categorie, index) => {
                        const isCurrentCaterory = (searchParam.get('category') && 
                                                    searchParam.get('category') === categorie.slug);
                        return (
                                <li className="px-md-2 px-1" key={index}>
                                    <Link className="btn btn-info" 
                                    to={`?category=${categorie.slug}`} 
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
                <Components.HasMore isLoading={isLoading} page={page} 
                setPage={setPage} hasMore={hasMore}/>
            </div>
        </section>
    )
}
