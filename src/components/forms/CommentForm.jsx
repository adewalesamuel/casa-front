//'use client'
export function CommentForm(props) {
    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='description'>description</label>
                        <input className='form-control' type='text' id='description' name='description' 
                        placeholder='description' value={props.useComment.description ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useComment.setDescription(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='score'>score</label>
                        <input className='form-control' type='number' id='score' name='score' 
                        placeholder='score' value={props.useComment.score ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useComment.setScore(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='product_id'>product_id</label>
                        <select className='select2 form-control' id='product_id' name='product_id' 
                        value={props.useComment.product_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useComment.setProduct(e.target.value) ?? null}>
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
                        value={props.useComment.user_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useComment.setUser(e.target.value) ?? null}>
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