//'use client'
export function FeatureForm(props) {
    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='nom'>nom</label>
                        <input className='form-control' type='text' id='nom' name='nom' 
                        placeholder='nom' value={props.useFeature.nom ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useFeature.setNom(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='slug'>slug</label>
                        <input className='form-control' type='text' id='slug' name='slug' 
                        placeholder='slug' value={props.useFeature.slug ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useFeature.setSlug(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='icon_img_url'>icon_img_url</label>
                        <input className='form-control' type='text' id='icon_img_url' name='icon_img_url' 
                        placeholder='icon_img_url' value={props.useFeature.icon_img_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useFeature.setIcon_img_url(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='display_img_url'>display_img_url</label>
                        <input className='form-control' type='text' id='display_img_url' name='display_img_url' 
                        placeholder='display_img_url' value={props.useFeature.display_img_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useFeature.setDisplay_img_url(e.target.value) ?? null} required/>
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