//'use client'
export function CityForm(props) {
    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='nom'>nom</label>
                        <input className='form-control' type='text' id='nom' name='nom' 
                        placeholder='nom' value={props.useCity.nom ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useCity.setNom(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='slug'>slug</label>
                        <input className='form-control' type='text' id='slug' name='slug' 
                        placeholder='slug' value={props.useCity.slug ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useCity.setSlug(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='region_id'>region_id</label>
                        <select className='select2 form-control' id='region_id' name='region_id' 
                        value={props.useCity.region_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useCity.setRegion(e.target.value) ?? null}>
                            <option hidden>Choisissez une option</option>
                            {
                                props.regions.map((region, index) => {
                                    return (<option key={index} value={region.id ?? ''}>
                                                {region.name}
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