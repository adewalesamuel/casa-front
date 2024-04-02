//'use client'
export function RoleForm(props) {
    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='name'>name</label>
                        <input className='form-control' type='text' id='name' name='name' 
                        placeholder='name' value={props.useRole.name ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useRole.setName(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='slug'>slug</label>
                        <input className='form-control' type='text' id='slug' name='slug' 
                        placeholder='slug' value={props.useRole.slug ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useRole.setSlug(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='permissions'>permissions</label>
                        <input className='form-control' type='text' id='permissions' name='permissions' 
                        placeholder='permissions' value={props.useRole.permissions ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useRole.setPermissions(e.target.value) ?? null} required/>
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