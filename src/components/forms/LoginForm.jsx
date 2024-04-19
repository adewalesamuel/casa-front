export function LoginForm(props){
    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='email'>E-mail</label>
                        <input className='form-control rounded-md' type='email' id='email' name='email' 
                        placeholder='E-mail' value={props.email ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.setEmail(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='password'>Mot de passe</label>
                        <input className='form-control rounded-md' type='password' id='password' name='password' 
                        placeholder='Mot de passe' value={props.password ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.setPassword(e.target.value) ?? null} required/>
                    </div>
                </div>
                <div className='col-12 text-center mt-2'>
                    <button disabled={props.isDisabled ?? false} type='submit' 
                    className='btn btn-info btn-lg btn-block rounded-md'>
                        {props.isDisabled ? 'Chargement...' :  'Se connecter'}
                    </button>
                </div>
            </div>
        </form>
    )
}