//'use client'
export function AdminForm(props) {
    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='nom'>nom</label>
                        <input className='form-control' type='text' id='nom' name='nom' 
                        placeholder='nom' value={props.useAdmin.nom ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useAdmin.setNom(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='email'>email</label>
                        <input className='form-control' type='text' id='email' name='email' 
                        placeholder='email' value={props.useAdmin.email ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useAdmin.setEmail(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='password'>password</label>
                        <input className='form-control' type='text' id='password' name='password' 
                        placeholder='password' value={props.useAdmin.password ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useAdmin.setPassword(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='profile_img_url'>profile_img_url</label>
                        <input className='form-control' type='text' id='profile_img_url' name='profile_img_url' 
                        placeholder='profile_img_url' value={props.useAdmin.profile_img_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useAdmin.setProfile_img_url(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='role_id'>role_id</label>
                        <select className='select2 form-control' id='role_id' name='role_id' 
                        value={props.useAdmin.role_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useAdmin.setRole(e.target.value) ?? null}>
                            <option hidden>Choisissez une option</option>
                            {
                                props.roles.map((role, index) => {
                                    return (<option key={index} value={role.id ?? ''}>
                                                {role.name}
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