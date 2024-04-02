//'use client'
export function CategoryForm(props) {
    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='nom'>nom</label>
                        <input className='form-control' type='text' id='nom' name='nom' 
                        placeholder='nom' value={props.useCategory.nom ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useCategory.setNom(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='slug'>slug</label>
                        <input className='form-control' type='text' id='slug' name='slug' 
                        placeholder='slug' value={props.useCategory.slug ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useCategory.setSlug(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='description'>description</label>
                        <input className='form-control' type='text' id='description' name='description' 
                        placeholder='description' value={props.useCategory.description ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useCategory.setDescription(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='icon_img_url'>icon_img_url</label>
                        <input className='form-control' type='text' id='icon_img_url' name='icon_img_url' 
                        placeholder='icon_img_url' value={props.useCategory.icon_img_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useCategory.setIcon_img_url(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='display_img_url'>display_img_url</label>
                        <input className='form-control' type='text' id='display_img_url' name='display_img_url' 
                        placeholder='display_img_url' value={props.useCategory.display_img_url ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useCategory.setDisplay_img_url(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='quantite'>quantite</label>
                        <input className='form-control' type='number' id='quantite' name='quantite' 
                        placeholder='quantite' value={props.useCategory.quantite ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useCategory.setQuantite(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='category_id'>category_id</label>
                        <select className='select2 form-control' id='category_id' name='category_id' 
                        value={props.useCategory.category_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useCategory.setCategory(e.target.value) ?? null}>
                            <option hidden>Choisissez une option</option>
                            {
                                props.categorys.map((category, index) => {
                                    return (<option key={index} value={category.id ?? ''}>
                                                {category.name}
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