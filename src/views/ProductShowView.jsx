//'use client'
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Hooks } from '../hooks';
import { Components } from '../components';
import { Utils } from '../utils';
import avatarPlaceholder from '../assets/img/avatar-placeholder.webp';
import placeholderImg from '../assets/img/placeholder.webp';

export function ProductShowView() {
    let abortController = new AbortController();

    const {slug} = useParams();

    const useProduct = Hooks.useProduct();

    const [isContactVisible, setIsContactVisible] = useState(false);

    const [imageIndex, setImageIndex] = useState(0);

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

        return () => {
            abortController.abort();
            abortController = new AbortController();
        }
    }, [init])

    return (
        <section id="product">
            <Components.Loader isLoading={useProduct.isDisabled}>
                <div className='row'>
                    <div className='col-12 col-lg-7'>
                        <img className='img-fluid w-100 rounded-md' alt={useProduct.nom} loading='lazy'
                        src={useProduct.display_img_url_list[imageIndex] ?? ''} width={500} height={400}
                        onError={event => event.currentTarget.src = placeholderImg}/>
                        <div className='px-2 px-md-0 mt-O mt-md-2 product-image-list-container'>
                            <div className='card rounded-md'>
                                <div className='card-body p-xs'>
                                    <ul className='row list-unstyled mb-0'>
                                        {useProduct?.images_url_list.map((image_url, index) => {
                                            return (
                                                <li className='col' role="button" key={index}>
                                                    <img src={image_url} className='img-fluid rounded' 
                                                    loading='lazy' width={200} height={150} style={{
                                                        objectFit: 'cover', maxHeight: '150px'
                                                    }} onClick={() => setImageIndex(index)}/>
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
                                Categorie: {useProduct.category?.nom ?? "---"}
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
                                                width={40} height={40} loading='lazy'/>
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
                        <hr />
                        <div className='row align-items-center'>
                            <div className='px-3'>
                                <img src={useProduct.user?.profile_img_url ?? ''} alt={useProduct.user?.nom} 
                                width={70} height={70} className='img-fluid rounded-circle' 
                                onError={event => event.currentTarget.src = avatarPlaceholder} 
                                style={{objectFit: 'cover'}}/>
                                {useProduct.user.nom ?? ""}
                            </div>
                            <div className='px-3 flex-fill'>
                                {isContactVisible &&
                                    <button className='btn btn-primary btn-block user-select-all'>
                                        07 00 00 00 00
                                    </button>
                                }
                                {!isContactVisible && 
                                    <button className='btn btn-primary btn-block' 
                                    onClick={() => setIsContactVisible(true)}>
                                        Contactez
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Components.Loader>

        </section>
    )
}
