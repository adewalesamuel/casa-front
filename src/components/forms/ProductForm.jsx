//'use client'
export function ProductForm(props) {
    return (
        <form onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='nom'>nom</label>
                        <input className='form-control' type='text' id='nom' name='nom' 
                        placeholder='nom' value={props.useProduct.nom ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useProduct.setNom(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='slug'>slug</label>
                        <input className='form-control' type='text' id='slug' name='slug' 
                        placeholder='slug' value={props.useProduct.slug ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useProduct.setSlug(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='description'>description</label>
                        <input className='form-control' type='text' id='description' name='description' 
                        placeholder='description' value={props.useProduct.description ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useProduct.setDescription(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='prix'>prix</label>
                        <input className='form-control' type='text' id='prix' name='prix' 
                        placeholder='prix' value={props.useProduct.prix ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useProduct.setPrix(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                <div className='form-group'>
                    <label htmlFor='type_paiement'>type_paiement</label>
                    <select className='select2 form-control' id='type_paiement' name='type_paiement' 
                    value={props.useProduct.type_paiement ?? ''} disabled={props.isDisabled} 
                    onChange={ e => props.useProduct.setType_paiement(e.target.value) ?? null}>
                        <option hidden>Choisissez une option</option>
                        <option value='mois'>Par mois</option>
                        <option value='an'>Par an</option>
                        <option value='unique'>Par unique</option>
                        <option value='semaine'>Par semaine</option>
                        <option value='jour'>Par jour</option>
                    </select>
                </div>
            </div>
				<div className='col-12'>
                <div className='form-group'>
                    <label htmlFor='type'>type</label>
                    <select className='select2 form-control' id='type' name='type' 
                    value={props.useProduct.type ?? ''} disabled={props.isDisabled} 
                    onChange={ e => props.useProduct.setType(e.target.value) ?? null}>
                        <option hidden>Choisissez une option</option>
                        <option value='pending'>En cours</option>
                        <option value='validated'>Validé</option>
                        <option value='canceled'>Annulé</option>
                    </select>
                </div>
            </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='display_img_url_list'>display_img_url_list</label>
                        <input className='form-control' type='text' id='display_img_url_list' name='display_img_url_list' 
                        placeholder='display_img_url_list' value={props.useProduct.display_img_url_list ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useProduct.setDisplay_img_url_list(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='images_url_list'>images_url_list</label>
                        <input className='form-control' type='text' id='images_url_list' name='images_url_list' 
                        placeholder='images_url_list' value={props.useProduct.images_url_list ?? ''}
                        disabled={props.isDisabled} onChange={ e => 
                            props.useProduct.setImages_url_list(e.target.value) ?? null} required/>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='category_id'>category_id</label>
                        <select className='select2 form-control' id='category_id' name='category_id' 
                        value={props.useProduct.category_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useProduct.setCategory(e.target.value) ?? null}>
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
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='municipality_id'>municipality_id</label>
                        <select className='select2 form-control' id='municipality_id' name='municipality_id' 
                        value={props.useProduct.municipality_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useProduct.setMunicipality(e.target.value) ?? null}>
                            <option hidden>Choisissez une option</option>
                            {
                                props.municipalitys.map((municipality, index) => {
                                    return (<option key={index} value={municipality.id ?? ''}>
                                                {municipality.name}
                                            </option>)
                                })
                            }
                        </select>
                    </div>
                </div>
				<div className='col-12'>
                    <div className='form-group'>
                        <label htmlFor='user_id'>user_id</label>
                        <select className='select2 form-control' id='user_id' name='user_id' 
                        value={props.useProduct.user_id ?? ''} disabled={props.isDisabled} 
                        onChange={ e => props.useProduct.setUser(e.target.value) ?? null}>
                            <option hidden>Choisissez une option</option>
                            {
                                props.users.map((user, index) => {
                                    return (<option key={index} value={user.id ?? ''}>
                                                {user.name}
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