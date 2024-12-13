import { Components } from '..';
import { Utils } from '../../utils';

export function UserForm(props) {
    const {_} = Utils.String;

    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='profile_img_url'>{_('profile_img_url')}</label>
                        <Components.ImageFileInput img_url={props.useUser.profile_img_url}
                        handleImageChange={props.useUser.setProfile_img_url} />
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='id_card_url'>{_('id_card_url')}</label>
                        <Components.DocFileInput file_url={props.useUser.id_card_url}
                        handleDocChange={props.useUser.setId_card_url} />
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='nom'>{_('nom')}</label>
                        <input className='form-control' type='text' id='nom' name='nom' 
                        placeholder={_('nom')} value={props.useUser.nom ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setNom(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='email'>{_('email')}</label>
                        <input className='form-control' type='email' id='email' name='email' 
                        placeholder={_('email')} value={props.useUser.email ?? ''} required
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setEmail(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='adresse'>{_('adresse')}</label>
                        <input className='form-control' type='text' id='adresse' name='adresse' 
                        placeholder={_('adresse')} value={props.useUser.adresse ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setAdresse(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12 col-md-6 col-lg-4'>
                    <div className='form-group'>
                        <label htmlFor='numero_telephone'>{_('numero_telephone')}</label>
                        <input className='form-control' type='tel' id='numero_telephone' name='numero_telephone' 
                        placeholder={_('numero_telephone')} value={props.useUser.numero_telephone ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setNumero_telephone(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12 col-md-6 col-lg-4'>
                    <div className='form-group'>
                        <label htmlFor='numero_whatsapp'>{_('numero_whatsapp')}</label>
                        <input className='form-control' type='tel' id='numero_whatsapp' name='numero_whatsapp' 
                        placeholder={_('numero_whatsapp')} value={props.useUser.numero_whatsapp ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setNumero_whatsapp(e.target.value) ?? null}/>
                    </div>
                </div>
				<div className='col-12 col-md-6 col-lg-4'>
                    <div className='form-group'>
                        <label htmlFor='numero_telegram'>{_('numero_telegram')}</label>
                        <input className='form-control' type='tel' id='numero_telegram' name='numero_telegram' 
                        placeholder={_('numero_telegram')} value={props.useUser.numero_telegram ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setNumero_telegram(e.target.value) ?? null}/>
                    </div>
                </div>
                <div className="col-12">
                    <div className='form-group'>
                        <label htmlFor='type'>{_('Type de compte')}</label>
                        <select className='form-control custom-select' id='type' name='type'
                        value={props.useUser.type ?? ''} readOnly={true}
                        onChange={ e => props.useUser.setType(e.target.value) ?? null}>
                            <option hidden>Choisissez une option</option>
                            <option value='client'>Acheteur</option>
                            <option value='vendeur'>Vendeur</option>
                        </select>
                    </div>
                </div>
				
                <div className='col-12 text-right mt-5'>
                    <button disabled={props.isDisabled ?? false} type='submit' 
                    className='btn btn-primary'>
                        {props.isDisabled ? 'Chargement...' :  'Enregistrer'}
                    </button>
                </div>
            </div>
        </form>
    )
}