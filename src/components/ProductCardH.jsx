import { Link } from 'react-router-dom';
import * as Icons from 'react-feather';
import placeholderImg from '../assets/img/placeholder.webp';


export function ProductCardH({product}) {
	const productImg = product?.images_url_list[0] ?? null;

	return (
			<article className="card p-2 flex-row">
                <Link className="col-5 px-0" to={`/publications/${product?.slug ?? ''}`}>
	                <img className="card-img-top rounded" src={productImg ?? placeholderImg} 
	                alt={product?.nom ?? ''}/>
	            </Link>
                <div className="col-7 px-0 pl-3">
                    <h5 className="card-title mb-0 text-secondary">
                        <Link to={`/publications/${product?.slug ?? ''}`} className="text-secondary">
                            {product?.nom ?? "---"}
                        </Link>
                    </h5>
                    <small className="card-text overflow-hidden d-inline-block 
                    text-nowrap" style={{
                        textOverflow:"ellipsis",
                        maxWidth: "100%"
                    }}>{product?.municipality?.city.nom ?? "---"} - {product?.municipality.nom ?? "---"}</small>
                    <div className="d-flex justify-content-center py-1">
 						<div className="col badge badge-primary mr-2">
                        	Category: {product?.category?.nom ?? "---"}
                        </div>
                        <div className="col badge badge-outline-primary text-primary">
							{product?.type ?? "---"}
                        </div>
                    </div>
                    <Link to={`/publications/${product?.slug ?? ''}`} className="text-secondary d-flex 
                    pt-3 align-tiems-center justify-content-between">
                        <h6 className="m-0">{product?.prix ?? "---"} cfa</h6>
                        <Icons.ChevronRight />
                    </Link>
                </div>
            </article>
		)
}