import { BrowserRouter, Link } from "react-router-dom"
import logo from './assets/logo.jpeg';
import * as Icons from 'react-feather';
import placeholderImg from './assets/img/placeholder.webp';
import { Components } from './components';
import { Layouts } from './layouts';

function App() {
    return (
        <BrowserRouter>
            <Layouts.MainLayout>
                <section className="py-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <h5>Publicaitons récentes</h5>
                        <a href="/" className="btn btn-link text-primary">Voir plus</a>
                    </div>
                    <div className="col-12">
                        <ul className="list-unstyled mb-0 row">
                            <li className="col-lg-3 col-md-4 col-6 px-md-2 px-0 pb-3">
                                <article className="card p-2">
                                    <img className="card-img-top rounded" src={placeholderImg} alt="image"/>
                                    <div className="card-body px-1 py-2">
                                        <h5 className="card-title mb-0 text-secondary">Maison à louer</h5>
                                        <small className="card-text overflow-hidden d-inline-block 
                                        text-nowrap" style={{
                                            textOverflow:"ellipsis",
                                            maxWidth: "100%"
                                        }}>Côte d&apos;Ivoire, Abidjan Cocody</small>
                                        <div className="d-flex justify-content-center py-1">
                                            <div className="col badge badge-primary mr-2">Category: Duplex</div>
                                            <div className="col badge badge-outline-primary text-primary">
                                                Location
                                            </div>
                                        </div>
                                        <a href="/" className="text-secondary d-flex pt-3 align-tiems-center 
                                        justify-content-between">
                                            <h6 className="m-0">250 000 cfa</h6>
                                            <Icons.ChevronRight />
                                        </a>
                                    </div>
                                </article>
                            </li>
                        </ul>
                    </div>
                </section>  
                <section className="py-3 mt-4">
                    <h5>Découvrez toutes nos publications</h5>
                    <div className="col-12">
                        <ul className="list-unstyled mb-0 row overflow-x-hidden">
                            <li className="col-lg-6 col-12 px-md-2 px-0 pb-3">
                                <article className="card p-2 flex-row">
                                    <div className="col-5 px-0">
                                        <img className="card-img-top rounded" src={placeholderImg} alt="image"/>
                                    </div>
                                    <div className="col-7 px-0 pl-3">
                                        <h5 className="card-title mb-0 text-secondary">Maison à louer</h5>
                                        <small className="card-text overflow-hidden d-inline-block 
                                        text-nowrap" style={{
                                            textOverflow:"ellipsis",
                                            maxWidth: "100%"
                                        }}>Côte d&apos;Ivoire, Abidjan Cocody</small>
                                        <div className="d-flex justify-content-center py-1">
                                            <div className="col badge badge-primary mr-2">Category: Duplex</div>
                                            <div className="col badge badge-outline-primary text-primary">
                                                Location
                                            </div>
                                        </div>
                                        <a href="/" className="text-secondary d-flex pt-3 align-tiems-center 
                                        justify-content-between">
                                            <h6 className="m-0">250 000 cfa</h6>
                                            <Icons.ChevronRight />
                                        </a>
                                    </div>
                                </article>
                            </li>
                        </ul>
                    </div>
                </section>  
            </Layouts.MainLayout>
        </BrowserRouter>
)
}

export default App
