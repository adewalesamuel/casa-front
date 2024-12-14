//'use client'
import { Utils } from '../../utils';

export function AccountForm(props) {
    const {__} = Utils.String;

    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='is_active'>{__('is_active')}</label>
                        <input className='form-control' type='checkbox' id='is_active' name='is_active' 
                        placeholder={__('is_active')} value={props.useAccount.is_active ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useAccount.setIs_active(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='user_id'>{__('user_id')}</label>
                        <select className='select2 form-control' id='user_id' name='user_id' 
                        value={props.useAccount.user_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useAccount.setUser_id(e.target.value) ?? null}>
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