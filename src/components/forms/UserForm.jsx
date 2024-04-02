//'use client'
export function UserForm(props) {
    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='nom'>nom</label>
                        <input className='form-control' type='text' id='nom' name='nom' 
                        placeholder='nom' value={props.useUser.nom ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setNom(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='email'>email</label>
                        <input className='form-control' type='text' id='email' name='email' 
                        placeholder='email' value={props.useUser.email ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setEmail(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='password'>password</label>
                        <input className='form-control' type='text' id='password' name='password' 
                        placeholder='password' value={props.useUser.password ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setPassword(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='profile_img_url'>profile_img_url</label>
                        <input className='form-control' type='text' id='profile_img_url' name='profile_img_url' 
                        placeholder='profile_img_url' value={props.useUser.profile_img_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setProfile_img_url(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                <div className='form-group'>
                    <label htmlFor='genre'>genre</label>
                    <select className='select2 form-control' id='genre' name='genre' 
                    value={props.useUser.genre ?? ''} disabled={props.isDisabled} 
                    onChange={ e => props.useUser.setGenre(e.target.value) ?? null}>
                        <option hidden>Choisissez une option</option>
                        <option value='pending'>En cours</option>
                        <option value='validated'>Validé</option>
                        <option value='canceled'>Annulé</option>
                    </select>
                </div>
            </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='adresse'>adresse</label>
                        <input className='form-control' type='text' id='adresse' name='adresse' 
                        placeholder='adresse' value={props.useUser.adresse ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setAdresse(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='numero_telephone'>numero_telephone</label>
                        <input className='form-control' type='text' id='numero_telephone' name='numero_telephone' 
                        placeholder='numero_telephone' value={props.useUser.numero_telephone ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setNumero_telephone(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='numero_whatsapp'>numero_whatsapp</label>
                        <input className='form-control' type='text' id='numero_whatsapp' name='numero_whatsapp' 
                        placeholder='numero_whatsapp' value={props.useUser.numero_whatsapp ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setNumero_whatsapp(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='numero_telegram'>numero_telegram</label>
                        <input className='form-control' type='text' id='numero_telegram' name='numero_telegram' 
                        placeholder='numero_telegram' value={props.useUser.numero_telegram ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setNumero_telegram(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='company_name'>company_name</label>
                        <input className='form-control' type='text' id='company_name' name='company_name' 
                        placeholder='company_name' value={props.useUser.company_name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setCompany_name(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='company_logo_url'>company_logo_url</label>
                        <input className='form-control' type='text' id='company_logo_url' name='company_logo_url' 
                        placeholder='company_logo_url' value={props.useUser.company_logo_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setCompany_logo_url(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                <div className='form-group'>
                    <label htmlFor='type'>type</label>
                    <select className='select2 form-control' id='type' name='type' 
                    value={props.useUser.type ?? ''} disabled={props.isDisabled} 
                    onChange={ e => props.useUser.setType(e.target.value) ?? null}>
                        <option hidden>Choisissez une option</option>
                        <option value='pending'>En cours</option>
                        <option value='validated'>Validé</option>
                        <option value='canceled'>Annulé</option>
                    </select>
                </div>
            </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='api_token'>api_token</label>
                        <input className='form-control' type='text' id='api_token' name='api_token' 
                        placeholder='api_token' value={props.useUser.api_token ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setApi_token(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='is_active'>is_active</label>
                        <input className='form-control' type='checkbox' id='is_active' name='is_active' 
                        placeholder='is_active' value={props.useUser.is_active ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setIs_active(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='is_company'>is_company</label>
                        <input className='form-control' type='checkbox' id='is_company' name='is_company' 
                        placeholder='is_company' value={props.useUser.is_company ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setIs_company(e.target.value) ?? null} required/>
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