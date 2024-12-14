//'use client'
import { useEffect } from 'react';
import * as Icons from 'react-feather';
import { Components } from '../../components';
import { Utils } from '../../utils';
import { Hooks } from '../../hooks';

export function ProductForm(props) {
    const {_} = Utils.String;

    const useFile = Hooks.useFile('product');

    const handleDeleteClick = index => {
        const display_img_url_listCopy = [...props.useProduct.display_img_url_list];
        const images_url_listCopy = [...props.useProduct.display_img_url_list];

        display_img_url_listCopy.splice(index, 1);
        images_url_listCopy.splice(index, 1);

        props.useProduct.setDisplay_img_url_list(display_img_url_listCopy);
        props.useProduct.setImages_url_list(images_url_listCopy);
    }

    useEffect(() => {
        if (useFile.fileUrl.length == 0) return;

        props.useProduct.handleImageChange(
            useFile.fileUrl.display_img_url,
            useFile.fileUrl.img_url);
    }, [useFile.fileUrl])

    return (
        <form className="bg-white rounded" 
        onSubmit={props.handleFormSubmit ?? null}>
            <div className='row'>
                <div className='col-12 col-md-6'>
                    <div className='col-12 mb-3'>
                        <div className="row justify-content-start mb-2">
                            {props.useProduct.images_url_list.map((image_url, index) => {
                                return (
                                        <div className="col-6 col-md-4 mb-4 position-relative" key={index}>
                                            <Icons.Trash2 className="bg-danger text-white rounded-pill p-1 
                                            position-absolute" size={24} role='button' 
                                            onClick={() => handleDeleteClick(index)}/>

                                            <img src={image_url} className='w-100 rounded'
                                            style={{height: "7rem", objectFit:"cover"}}/>
                                        </div>
                                    )
                            })}
                        </div>
                        <button className="btn btn-outline-info position-relative" 
                        type="button">
                            <span className="mr-2">Ajouter une image</span>
                            {useFile.isLoading &&  <Components.Spinner size={20}/>}
                            {!useFile.isLoading && 
                                <Icons.Plus className="rounded-pill bg-info 
                                text-white p-1" size={24}/>  
                            }
                            <input type="file" className="position-absolute w-100 
                            h-100" style={{top:0, left:0, opacity: 0}} role='button'
                            onChange={e => useFile.handleFileChange(e.target.files[0])}
                            disabled={useFile.isLoading}/>
                        </button>
                    </div>
                    <div className='col-12'>
                        <div className='form-group'>
                            <label htmlFor='nom'>{_('nom')}</label>
                            <input className='form-control' type='text' id='nom' name='nom' 
                            placeholder={_('nom')} value={props.useProduct.nom ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useProduct.setNom(e.target.value) ?? null} />
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group'>
                            <label htmlFor='description'>{_('description')}</label>
                            <textarea className='form-control' rows={4}  id='description' name='description' 
                            placeholder={_('description')} value={props.useProduct.description ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useProduct.setDescription(e.target.value) ?? null} />
                        </div>
                    </div>
                </div>
                <div className='col-12 col-md-6'>
                    <div className='col-12'>
                        <div className='form-group'>
                            <label htmlFor='prix'>{_('prix')}</label>
                            <input className='form-control' type='number' id='prix' name='prix' 
                            placeholder={_('prix')} value={props.useProduct.prix ?? ''}
                            disabled={props.isDisabled} onChange={ e => 
                                props.useProduct.setPrix(e.target.value) ?? null} />
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group'>
                            <label htmlFor='type_paiement'>{_('type_paiement')}</label>
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
                            <label htmlFor='type'>{_('type')}</label>
                            <select className='select2 form-control' id='type' name='type' 
                            value={props.useProduct.type ?? ''} disabled={props.isDisabled} 
                            onChange={ e => props.useProduct.setType(e.target.value) ?? null}>
                                <option hidden>Choisissez une option</option>
                                <option value='Location'>Location</option>
                                <option value='Achat'>Achat</option>
                            </select>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group'>
                            <label htmlFor='category_id'>{_('category_id')}</label>
                            <select className='select2 form-control' id='category_id' name='category_id' 
                            value={props.useProduct.category_id ?? ''} disabled={props.isDisabled} 
                            onChange={ e => props.useProduct.setCategory_id(e.target.value) ?? null}>
                                <option hidden>Choisissez une option</option>
                                {
                                    props.categories.map((category, index) => {
                                        return (<option key={index} value={category.id ?? ''}>
                                                    {category.nom}
                                                </option>)
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='form-group'>
                            <label htmlFor='municipality_id'>{_('municipality_id')}</label>
                            <select className='select2 form-control' id='municipality_id' name='municipality_id' 
                            value={props.useProduct.municipality_id ?? ''} disabled={props.isDisabled} 
                            onChange={ e => props.useProduct.setMunicipality_id(e.target.value) ?? null}>
                                <option hidden>Choisissez une option</option>
                                {
                                    props.municipalities.map((municipality, index) => {
                                        return (<option key={index} value={municipality.id ?? ''}>
                                                    {municipality.nom}
                                                </option>)
                                    })
                                }
                            </select>
                        </div>
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