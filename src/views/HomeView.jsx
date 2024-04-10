import { Components } from '../components'

export function HomeView() {
	return (
			<section id="home">
				 <section className="py-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5>Publicaitons récentes</h5>
                        <a href="/" className="btn btn-link text-primary">Voir plus</a>
                    </div>
                    <div className="col-12">
                        <ul className="list-unstyled mb-0 row">
                            <li className="col-lg-3 col-md-4 col-6 px-md-2 px-0 pb-3">
                                <Components.ProductCardV prodcut={{}}/>
                            </li>
                        </ul>
                    </div>
                </section>  
                <section className="py-3 mt-4">
                    <h5>Découvrez toutes nos publications</h5>
                    <div className="col-12">
                        <ul className="list-unstyled mb-0 row">
                            <li className="col-lg-6 col-12 px-md-2 px-0 pb-3">
                                <Components.ProductCardH prodcut={{}} />
                            </li>
                        </ul>
                    </div>
                </section>  
			</section>
		)
}