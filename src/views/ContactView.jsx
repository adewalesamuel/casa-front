import { useState } from 'react';
import mapImg from '../assets/img/map.png';
import * as Icons from 'react-feather';

export function ContactView() {
    const [description, setDescription] = useState('')
    const [email, setEmail] = useState('');
    const [fullname, setFullname] = useState('');
    const [isDisabled, setIsDisabled] = useState(false);

    return (
        <section id="contact">
            <div className="row py-3">
                <div className="col-12 col-lg-6 py-3">
                    <img src={mapImg} alt="map" className="img-fluid rounded-md"
                    width={537} height={400} loading='lazy' />
                </div>
                <div className="col-12 col-lg-6 py-3">
                    <h2>Formulaire contact</h2>
                    <p>Remplissez le formulaire pour nous contactez</p>
                    <div className='row mb-3'>
                        <div className='col mr-2'><Icons.Mail /> imohtepgroupci@gmail.com</div>
                        <div className='col'><Icons.Phone /> +225 0767458839</div>
                    </div>
                    <form>
                        <div className='row'>
                            <div className='col-12'>
                                <div className='form-group'>
                                    <input className='form-control' type='text' id='nom' name='nom' 
                                    placeholder='Nom complet' value={fullname ?? ''} disabled={isDisabled} 
                                    onChange={ e => setFullname(e.target.value) ?? null} />
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className='form-group'>
                                    <input className='form-control' type='email' id='email' name='email' 
                                    placeholder='E-mail' value={email ?? ''}disabled={isDisabled} 
                                    onChange={ e => setEmail(e.target.value) ?? null} required/>
                                </div>
                            </div>
                            <div className='col-12'>
                                <div className='form-group'>
                                    <textarea className='form-control' type='text' id='description' 
                                    name='description' placeholder='Entrez votre message' 
                                    value={description ?? ''} disabled={isDisabled} onChange={ e => 
                                    setDescription(e.target.value) ?? null} rows={4}></textarea>
                                </div>
                            </div>
                            <div className='col-12 text-right mt-1'>
                                <button disabled={isDisabled ?? false} type='submit' 
                                className='btn btn-primary'>
                                    {isDisabled ? 'Chargement...' :  'Envoyer le message'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}