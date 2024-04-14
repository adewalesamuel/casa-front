//'use client'
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Hooks } from '../hooks';
import { Components } from '../components';
import { Utils } from '../utils';


export function ProductShowView() {
    let abortController = new AbortController();

    const {slug} = useParams();

    const useProduct = Hooks.useProduct();

    const init = useCallback(async () => {
        useProduct.setIsDisabled(true);

        try {
            await useProduct.getProduct(slug, abortController.signal);			
        } catch (error) {
            console.log(error);
        } finally{
            useProduct.setIsDisabled(false);
        }
    }, [slug])

    useEffect(() => {
        init();
    }, [init])

    return (
        <section id="product">
            <Components.Loader isLoading={useProduct.isDisabled}>

            </Components.Loader>
            <div className='row'>
                <div className='col-12 col-lg-7'>
                    <img className='img-fluid w-100 rounded-md' alt={useProduct.nom} 
                    src={useProduct.display_img_url_list[0] ?? ''} width={500} height={400}/>
                    <div className='px-2 px-md-0 mt-O mt-md-2 product-image-list-container'>
                        <div className='card rounded-md'>
                            <div className='card-body p-xs'>
                                <ul className='row list-unstyled mb-0'>
                                    {useProduct?.images_url_list.map((image_url, index) => {
                                        return (
                                            <li className='col' role="button" key={index}>
                                                <img src={image_url} className='img-fluid rounded' 
                                                width={200} height={150} style={{
                                                    objectFit: 'cover', maxHeight: '150px'
                                                }}/>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-12 col-lg-5'>
                    <div className="d-flex py-1 mt-2">
                        <div className="badge badge-primary mr-2 px-4">
                            Category: {useProduct.category?.nom ?? "---"}
                        </div>
                        <div className="badge badge-outline-primary text-primary px-4">
                            {useProduct.type ?? "---"}
                        </div>
                    </div>
                    <div className='py-3'>
                        <div className='row justify-content-between'>
                            <div className='col-8'>
                                <h4 className="mb-0">{useProduct?.nom ?? "---"}</h4>
                                <small className='text-muted'>
                                    Publié le {Utils.Date.styleDate(useProduct.created_at)}
                                </small>
                            </div>
                            <div className='col-4 mt-0'>
                                <h5 className="m-0 text-primary text-right">
                                    {useProduct?.prix ?? "---"} cfa
                                </h5>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className=''>
                        <h5>Caracteristiques du bien</h5>
                        <ul className='row list-unstyled py-2 m-0 text-nowrap 
                        mw-100 overflow-auto justify-content-left flex-nowrap'>
                            {useProduct.features.map((feature, index) => {
                                return (
                                    <li className='px-1 position-relative' key={index}>
                                        <small className='bage badge-pill badge-primary position-absolute'
                                        style={{
                                            top:'-6px',
                                            right:'-2px',
                                            fontSize: '0.7rem'
                                        }}>
                                            {feature.pivot.quantite}
                                        </small>
                                        <div className='border border-primary p-2 px-4 text-center rounded'>
                                            <small className='d-block text-uppercase font-weight-bolder'>
                                                {feature.nom}
                                            </small>
                                            <img src={feature.icon_img_url} alt={feature.nom} 
                                            width={40} height={40}/>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className='d-none d-md-block mt-2'>
                        <h5>Description</h5>
                        <p className='text-muted'>{useProduct.description}</p>
                    </div>
                </div>
            </div>

        </section>
    )
}
