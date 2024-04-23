export function RegisterForm(props){
    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='nom'>Nom</label>
                        <input className='form-control rounded-md' type='text' id='nom' name='nom' 
                        placeholder='Nom' value={props.useUser.nom ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setNom(e.target.value) ?? null} />
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='numero_telephone'>Numéro de Téléphone</label>
                        <input className='form-control rounded-md' type='tel' id='numero_telephone' name='numero_telephone' 
                        placeholder='Numéro de Téléphone' value={props.useUser.numero_telephone ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useUser.setNumero_telephone(e.target.value) ?? null} />
                    </div>
                </div>
                <div className="col-12">
                    <div className='form-group'>
                        <label htmlFor='type'>Type de compte</label>
                        <select className='form-control rounded-md' id='type' name='type' 
                        value={props.useUser.type ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useUser.setType(e.target.value) ?? null}>
                            <option hidden>Choisissez une option</option>
                            <option value='client'>Acheteur</option>
                            <option value='vendeur'>Vendeur</option>
                        </select>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='email'>E-mail</label>
                        <input className='form-control rounded-md' type='email' id='email' name='email' 
                        placeholder='E-mail' value={props.useUser.email ?? ''}
                        disabled={props.useUser.isDisabled} onChange={ e => 
                            props.useUser.setEmail(e.target.value) ?? null} />
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='password'>Mot de passe</label>
                        <input className='form-control rounded-md' type='password' id='password' name='password' 
                        placeholder='Mot de passe' value={props.useUser.password ?? ''}
                        disabled={props.useUser.isDisabled} onChange={ e => 
                            props.useUser.setPassword(e.target.value) ?? null} />
                    </div>
                </div>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='password'>Confirmez le mot de passe</label>
                        <input className='form-control rounded-md' type='password' id='password' 
                        name='password' placeholder='' value={props.useUser.password_confirmation ?? ''}
                        disabled={props.useUser.isDisabled} onChange={ e => 
                            props.useUser.setPassword_confirmation(e.target.value) ?? null} />
                    </div>
                </div>
                <div className='col-12 text-center mt-2'>
                    <button disabled={props.useUser.isDisabled ?? false} type='submit' 
                    className='btn btn-info btn-lg btn-block rounded-md'>
                        {props.useUser.isDisabled ? 'Chargement...' :  'S\'inscrire'}
                    </button>
                </div>
            </div>
        </form>
    )
}