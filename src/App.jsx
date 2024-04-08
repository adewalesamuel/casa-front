import { BrowserRouter, Link } from "react-router-dom"
import logo from './assets/logo.jpeg';
import * as Icons from 'react-feather';

function App() {
    return (
        <BrowserRouter>
            <div className='container-fluid'>
                <section id="mainHeader">
                    <div className="container">
                        <nav className="navbar navbar-expand-lg navbar-light bg-white 
                        justify-content-between d-flex flex-row flex-no-wrap">
                            <Link className="navbar-brand">
                                <img src={logo} className="site-logo" /> 
                            </Link>
                            <div>
                                <ul className="list-unstyled d-flex mr-auto">
                                    <li className="mx-1">
                                        <Link className="nav-link p-2" to={'/'}>
                                            <Icons.Home style={{
                                                width:'20px', 
                                                height:'20px', 
                                                marginRight: '5px'}}/>
                                            <span>Accueil</span>
                                        </Link>
                                    </li>
                                    <li className="mx-1">
                                        <Link className="nav-link p-2" to={'/'}>
                                            <Icons.BookOpen style={{
                                                width:'20px', 
                                                height:'20px', 
                                                marginRight: '5px'}}/>
                                            <span>Category</span>
                                        </Link>
                                    </li>
                                    <li className="mx-1">
                                        <Link className="nav-link p-2" to={'/'}>
                                            <Icons.Heart style={{
                                                width:'20px', 
                                                height:'20px', 
                                                marginRight: '5px'}}/>
                                            <span>Favoris</span>
                                        </Link>
                                    </li>
                                    <li className="mx-1">
                                        <Link className="nav-link p-2" to={'/connexion'}>
                                            <Icons.User style={{
                                                width:'20px', 
                                                height:'20px', 
                                                marginRight: '5px'}}/>
                                            <span className="d-inline-block">Connexion</span>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </section>               
            </div>
            

        </BrowserRouter>
)
}

export default App
