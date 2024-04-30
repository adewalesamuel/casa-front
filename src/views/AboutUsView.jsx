import placeholderImg from '../assets/img/placeholder.webp';

export function AboutUsView() {
    return (
        <section id="about">
            <div className="row align-items-center py-3">
                <div className="col-12 col-lg-6">
                    <h2>
                        Notre passion pour l&apos;immobilier et notre 
                        engagement envers l&apos;excellence
                    </h2>
                    <p>
                        Fondée en 2005 par un groupe d&apos;entrepreneurs visionnaires, notre entreprise 
                        a débuté comme une petite agence immobilière locale, offrant des services de 
                        qualité dans le domaine de la vente et de la location de biens immobiliers 
                        résidentiels.
                    </p>
                    <p>
                        Au fil des années, grâce à notre dévouement envers nos clients 
                        et à notre expertise croissante, nous avons élargi notre portefeuille pour 
                        inclure des services de développement immobilier, de gestion de biens, et 
                        de conseil en investissement immobilier.
                        </p>
                </div>
                <div className="col-12 col-lg-6">
                    <img src={placeholderImg} className='img-fluid rounded-md' 
                    alt='section image' loading='lazy' width={537} height={400}/>
                </div>
            </div>
            <div className="row align-items-center py-3 mt-3 flex-row-reverse 
            flex-lg-row-reverse">
                <div className="col-12 col-lg-6">
                    <h2>
                        Notre mission est de façonner l&apos;avenir de l&apos;immobilier 
                    </h2>
                    <p>
                        Nous nous engageons à créer de la valeur pour nos clients, nos 
                        partenaires et nos communautés en offrant des services immobiliers 
                        de la plus haute qualité.
                    </p>
                    <p>
                        Nous croyons en l&apos;intégrité, en l&apos;innovation et en l&apos;engagement 
                        envers l&apos;excellence dans tout ce que nous faisons. Que ce soit en aidant nos 
                        clients à trouver leur maison de rêve, en développant des projets immobiliers 
                        emblématiques ou en gérant efficacement des biens, nous nous efforçons toujours 
                        de dépasser les attentes et de créer des expériences exceptionnelles.
                    </p>
                </div>
                <div className="col-12 col-lg-6">
                    <img src={placeholderImg} className='img-fluid rounded-md' 
                    alt='section image' loading='lazy' width={537} height={400}/>
                </div>
            </div>
        </section>
    )
}