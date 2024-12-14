import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as Icons from 'react-feather';
import placeholderImg from '../assets/img/placeholder.webp';
import { Utils } from '../utils';

export function ProductCardV({product}) {
    const {pathname} = useLocation();

    const [isMobile,] = useState(pathname.startsWith('/mobile'));

	return (
			<article className="card p-2">
                <Link className="" to={`${isMobile ? '/mobile' : ''}/publications/${product?.slug ?? ''}`}>
                    <img className="card-img-top rounded img-fluid" src={product.images_url_list[0] ?? ''} 
                    alt={product?.nom ?? ''} loading='lazy' width={219} height={159} 
                    onError={event => event.currentTarget.src = placeholderImg}/>
                </Link>
                <div className="card-body px-1 py-2">
                    <h5 className="card-title mb-0 text-secondary">
                        <Link to={`${isMobile ? '/mobile' : ''}/publications/${product?.slug ?? ''}`} 
                        className="text-secondary">
                            {product?.nom ?? "---"}
                        </Link>
                    </h5>                    
                    <small className="card-text overflow-hidden d-inline-block 
                    text-nowrap" style={{
                        textOverflow:"ellipsis",
                        maxWidth: "100%"
                    }}>
                        {product?.municipality?.city?.nom ?? "---"} - {product?.municipality?.nom ?? "---"}
                    </small>
                    <div className="d-flex justify-content-center py-1">
                        <div className="col badge badge-primary mr-2">
                            Categorie: {product?.category?.nom ?? "---"}
                        </div>
                        <div className="col badge badge-outline-primary text-primary">
                            {product?.type ?? "---"}
                        </div>
                    </div>
                    <Link to={`${isMobile ? '/mobile' : ''}/publications/${product?.slug ?? ''}`} 
                    className="text-secondary d-flex pt-3 align-tiems-center 
                    justify-content-between">
                        <h6 className="m-0">{Utils.String.parsePrice(product?.prix) ?? "---"}</h6>
                        <Icons.ChevronRight />
                    </Link>
                </div>
            </article>
		)
}