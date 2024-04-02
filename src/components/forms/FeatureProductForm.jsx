//'use client'
export function FeatureProductForm(props) {
    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='feature_id'>feature_id</label>
                        <select className='select2 form-control' id='feature_id' name='feature_id' 
                        value={props.useFeatureProduct.feature_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useFeatureProduct.setFeature(e.target.value) ?? null}>
                            <option hidden>Choisissez une option</option>
                            {
                                props.features.map((feature, index) => {
                                    return (<option key={index} value={feature.id ?? ''}>
                                                {feature.name}
                                            </option>)
                                })
                            }
                        </select>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='product_id'>product_id</label>
                        <select className='select2 form-control' id='product_id' name='product_id' 
                        value={props.useFeatureProduct.product_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useFeatureProduct.setProduct(e.target.value) ?? null}>
                            <option hidden>Choisissez une option</option>
                            {
                                props.products.map((product, index) => {
                                    return (<option key={index} value={product.id ?? ''}>
                                                {product.name}
                                            </option>)
                                })
                            }
                        </select>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='quantite'>quantite</label>
                        <input className='form-control' type='number' id='quantite' name='quantite' 
                        placeholder='quantite' value={props.useFeatureProduct.quantite ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useFeatureProduct.setQuantite(e.target.value) ?? null} required/>
                    </div>
                </div>
				
                <div className='col-12 text-right'>
                    <button disabled={props.isDisabled ?? false} type='submit' 
                    className='btn btn-primary'>
                        {props.isDisabled ? 'Chargement...' :  'Enregistrer'}
                    </button>
                </div>
            </div>
        </form>
    )
}