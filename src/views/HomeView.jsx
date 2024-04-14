import { useState, useEffect, useCallback } from 'react'
import { Components } from '../components'
import { Services } from '../services'

export function HomeView() {
    let abortController = new AbortController();

    const [recentProducts, setRecentProducts] = useState([]);
    const [productList, setProductList] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoadingRecents, setIsLoadingRecents] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const loadProductList = async (page) => {
        setIsLoading(true);
        
        try {
            const {products} = await Services.ProductService
            .loadProductList(page, null, abortController.signal);

            setProductList([...productList, ...products.data]);

            if (page == 2 && productList.length === 0)
                setProductList([...recentProducts]);
        } catch(error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const init = useCallback(async () => {
        try {
            const {products} = await Services.ProductService.getAll(
                {page:1}, abortController.signal);

            setRecentProducts(products.data);
            setPage(page + 1);
        } catch(error){
            console.log(error);
        } finally {
            setIsLoadingRecents(false);
        }
    },[])

    useEffect(() => {
        init();

        return () => {
            abortController.abort()
            abortController = new AbortController();
        }
    }, [])

    useEffect(() => {
        loadProductList(page)
    }, [page]);

	return (
			<section id="home">
				<section className="py-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5>Publicaitons récentes</h5>
                        <a href="/" className="btn btn-link text-primary">Voir plus</a>
                    </div>
                    <div className="col-12">
                        {isLoadingRecents ?? <Components.Spinner />}
                        <ul className="list-unstyled mb-0 row">
                            {recentProducts.map((product, index) => {
                                return (
                                        <li className="col-lg-3 col-md-4 col-6 px-md-2 
                                        px-0 pb-3" key={index}>
                                            <Components.ProductCardV product={product}/>
                                        </li>
                                    )
                            })}
                        </ul>
                    </div>
                </section>  
                <section className="py-3 mt-4">
                    <h5>Découvrez toutes nos publications</h5>
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
                    {isLoading ?? <Components.Spinner />}
                </section>  
			</section>
		)
}