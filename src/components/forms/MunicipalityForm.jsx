//'use client'
export function MunicipalityForm(props) {
    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='nom'>nom</label>
                        <input className='form-control' type='text' id='nom' name='nom' 
                        placeholder='nom' value={props.useMunicipality.nom ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useMunicipality.setNom(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='slug'>slug</label>
                        <input className='form-control' type='text' id='slug' name='slug' 
                        placeholder='slug' value={props.useMunicipality.slug ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useMunicipality.setSlug(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='city_id'>city_id</label>
                        <select className='select2 form-control' id='city_id' name='city_id' 
                        value={props.useMunicipality.city_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useMunicipality.setCity(e.target.value) ?? null}>
                            <option hidden>Choisissez une option</option>
                            {
                                props.citys.map((city, index) => {
                                    return (<option key={index} value={city.id ?? ''}>
                                                {city.name}
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