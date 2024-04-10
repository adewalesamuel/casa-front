import { Link } from "react-router-dom";
import * as Icons from 'react-feather';
import logo from '../assets/logo.jpeg';
	
export function MainMenu() {
	return (
			<nav className="navbar navbar-expand-lg navbar-light">
                <Link className="navbar-brand" to='/'>
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
                            <Link className="nav-link p-2 text-white" to={'/categories?category=all'}>
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
		)
}