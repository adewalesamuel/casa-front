//'use client'
export function PromoCodeForm(props) {
    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='code'>code</label>
                        <select className='select2 form-control' id='code' name='code' 
                        value={props.usePromoCode.code ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.usePromoCode.setCode(e.target.value) ?? null}>
                            <option hidden>Choisissez une option</option>
                            {
                                props.codes.map((code, index) => {
                                    return (<option key={index} value={code.id ?? ''}>
                                                {code.name}
                                            </option>)
                                })
                            }
                        </select>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='expiration_date'>expiration_date</label>
                        <input className='form-control' type='date' id='expiration_date' name='expiration_date' 
                        placeholder='expiration_date' value={props.usePromoCode.expiration_date ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.usePromoCode.setExpiration_date(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                <div className='form-group'>
                    <label htmlFor='type'>type</label>
                    <select className='select2 form-control' id='type' name='type' 
                    value={props.usePromoCode.type ?? ''} disabled={props.isDisabled} 
                    onChange={ e => props.usePromoCode.setType(e.target.value) ?? null}>
                        <option hidden>Choisissez une option</option>
                        <option value='pending'>En cours</option>
                        <option value='validated'>Validé</option>
                        <option value='canceled'>Annulé</option>
                    </select>
                </div>
            </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='user_id'>user_id</label>
                        <select className='select2 form-control' id='user_id' name='user_id' 
                        value={props.usePromoCode.user_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.usePromoCode.setUser(e.target.value) ?? null}>
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