import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Components } from '../components'
import { Services } from '../services'
import 'swiper/css';

export function HomeView() {
    let abortController = new AbortController();

    const [recentProducts, setRecentProducts] = useState([]);
    const [productList, setProductList] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoadingRecents, setIsLoadingRecents] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);

    const loadProductList = async (page) => {
        setIsLoading(true);
        
        try {
            const {products} = await Services.ProductService
            .loadProductList(page, null, abortController.signal);

            if (products.data.length === 0) setHasMore(false);

            if (page == 2 && products.data.length === 0) {
                setHasMore(false)
                setProductList([...recentProducts]);

                return;
            }

            setProductList([...productList, ...products.data]);
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
                        <Link to={'/publications'} className="btn btn-link text-primary">Voir plus</Link>
                    </div>
                    <Components.Loader isLoading={isLoadingRecents}>
                        <Swiper slidesPerView={'auto'} spaceBetween={20} 
                        lazyPreloadPrevNext={2} className="mySwiper">
                            {recentProducts.map((product, index) => {
                                return (
                                        <SwiperSlide key={index} style={{maxWidth: '230px'}}>
                                            <Components.ProductCardV product={product}/>
                                        </SwiperSlide>
                                    )
                            })}
                        </Swiper>
                    </Components.Loader>
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
                    <Components.HasMore isLoading={isLoading} page={page} 
                    setPage={setPage} hasMore={hasMore}/>
                </section>  
			</section>
		)
}