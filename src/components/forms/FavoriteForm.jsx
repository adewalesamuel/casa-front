//'use client'
export function FavoriteForm(props) {
    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='product_id'>product_id</label>
                        <select className='select2 form-control' id='product_id' name='product_id' 
                        value={props.useFavorite.product_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useFavorite.setProduct(e.target.value) ?? null}>
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
                        <label htmlFor='user_id'>user_id</label>
                        <select className='select2 form-control' id='user_id' name='user_id' 
                        value={props.useFavorite.user_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useFavorite.setUser(e.target.value) ?? null}>
                            <option hidden>Choisissez une option</option>
                            {
                                props.users.map((user, index) => {
                                    return (<option key={index} value={user.id ?? ''}>
                                                {user.name}
                                            </option>)
                                })
                            }
                        </select>
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