//'use client'

import { Utils } from "../utils";

export function TransactionForm(props) {
    const {_} = Utils.String;

    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='amount'>{_('amount')} <small>(Fcfa)</small></label>
                        <input className='form-control' type='number' id='amount' name='amount' 
                        placeholder={_('amount')} value={props.useTransaction.amount ?? ''}
                        min={2000} disabled={props.isDisabled} onChange={ e => 
                            props.useTransaction.setAmount(e.target.value) ?? null}/>
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