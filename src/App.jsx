import { BrowserRouter, Link } from "react-router-dom"
import logo from './assets/logo.jpeg';
import * as Icons from 'react-feather';
import placeholderImg from './assets/img/placeholder.webp';

function App() {
    return (
        <BrowserRouter>
            <div className='w-100'>
                <header id="mainHeader" className="bg-primary">
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-light">
                            <Link className="navbar-brand">
                                <img src={logo} className="site-logo" /> 
                            </Link>
                            <div className="collapse navbar-collapse">
                                <ul className="navbar-nav mx-auto">
                                    <li className="mx-1">
                                        <Link className="nav-link p-2 text-white" to={'/'}>
                                            <span>Accueil</span>
                                        </Link>
                                    </li>
                                    <li className="mx-1">
                                        <Link className="nav-link p-2 text-white" to={'/'}>
                                            <span>Categories</span>
                                        </Link>
                                    </li>
                                    <li className="mx-1">
                                        <Link className="nav-link p-2 text-white" to={'/'}>
                                            <span>Favoris</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="">
                                <Link className="p-2 text-white" to={'/connexion'}>
                                    <Icons.User className='mr-2' style={{
                                        width:'20px', 
                                        height:'20px', 
                                    }}/>
                                    <span className="d-inline-block">Connexion</span>
                                </Link>
                                <Link className="p-2 text-white" to={'/inscription'}>
                                    <Icons.UserPlus className='mr-2' style={{
                                        width:'20px', 
                                        height:'20px', 
                                    }}/>
                                    <span className="d-inline-block">Inscription</span>
                                </Link>
                            </div>
                        </nav>
                        <div className="text-white mt-xl-5 py-5 text-center mx-auto" 
                        id="mainHeader">
                            <h1 className="">Trouvez vore futur propriété</h1>
                            <p>Recherchez parmis des centaines de maisons à acheter ou à louer</p>
                            <form className="form-inline mt-5 justify-content-center pb-4">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text bg-white text-primary border-0">
                                            <Icons.Search />
                                        </span>
                                    </div>
                                    <input className="bg-white form-control border-0 pl-0" type="search" 
                                        name="search" placeholder="Recherchez..."/>
                                </div>
                                <select className="rounded custom-select ml-3 px-4 pr-5">
                                    <option hidden>Choisissez le lieu</option>
                                    <option>Abidjan</option>
                                    <option>Bouaké</option>
                                    <option>Villa</option>
                                </select>
                                <button className="btn bg-white rounded-circle p-2 ml-3">
                                    <Icons.Search />
                                </button>
                            </form>
                        </div>
                    </div>
                </header>    
                <main className="p-md-5 container">
                    <section className="py-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <h5>Publicaitons récentes</h5>
                            <a href="/" className="btn btn-link text-primary">Voir plus</a>
                        </div>
                        <div className="col-12">
                            <ul className="list-unstyled mb-0 row">
                                <li className="col-lg-3 col-md-4 col-6 px-md-2 px-0">
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
                                <li className="col-lg-6 col-12 px-md-2 px-0">
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
                                <li className="col-lg-6 col-12 px-md-2 px-0">
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
                                <li className="col-lg-6 col-12 px-md-2 px-0">
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
                </main>           
            </div>
            

        </BrowserRouter>
)
}

export default App
