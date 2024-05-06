import aboutImg from '../assets/img/about.jpg';

export function AboutUsView() {
    return (
        <section id="about">
            <div className="row align-items-center py-3">
                <div className="col-12 col-lg-6">
                    <h2>Qui sommes nous ?</h2>
                    <p className='font-weight-light' style={{fontSize: '1.5rem'}}>
                        MOHTEP GROUP CI est en entreprise spécialisée dans la gestion de patrimoines immobilières depuis 2022.
                    </p>
                    <p className='font-weight-light' style={{fontSize: '1.5rem'}}>
                        Nous nous sommes donnés pour mission non seulement de gérer en bon père de famille, les biens immobiliers de nos clients, mais aussi de sécurisée toute transaction immobilière de nos clients acheteurs.
                    </p>
                </div>
                <div className="col-12 col-lg-6">
                    <img src={aboutImg} className='img-fluid rounded-md' 
                    alt='section image' loading='lazy' width={537} height={400}/>
                </div>
            </div>
        </section>
    )
}