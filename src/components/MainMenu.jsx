import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import * as Icons from 'react-feather';
import logo from '../assets/img/logo.jpeg';
import { Utils } from "../utils";
	
export function MainMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {pathname} = useLocation();

    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname])

	return (
            <>
    			<nav className="navbar navbar-expand-lg navbar-light">
                    <Link className="navbar-brand" to='/'>
                        <img src={logo} className="site-logo" width={60} /> 
                    </Link>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mx-auto">
                            <li className="mx-1">
                                <Link className="nav-link p-2 text-white" to={'/'}>
                                    <span>Accueil</span>
                                </Link>
                            </li>
                            <li className="mx-1">
                                <Link className="nav-link p-2 text-white" 
                                to={'/categories?category=all'}>
                                    <span>Categories</span>
                                </Link>
                            </li>
                            <li className="mx-1">
                                <Link className="nav-link p-2 text-white" to={'/qui-sommes-nous'}>
                                    <span>Qui sommes nous</span>
                                </Link>
                            </li>
                            <li className="mx-1">
                                <Link className="nav-link p-2 text-white" to={'/contactez-nous'}>
                                    <span>Contact</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="d-none d-lg-block">
                        {!Utils.Auth.isLoggedIn() && 
                            <>
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
                            </>
                        }

                        {Utils.Auth.isLoggedIn() && 
                            <>
                                <Link className="p-2 text-white" to={'/mon-profil/modifier'}>
                                    <Icons.User className='mr-2' style={{
                                        width:'20px', 
                                        height:'20px', 
                                    }}/>
                                    <span className="d-inline-block">
                                        {Utils.Auth.getUser()?.nom}
                                    </span>
                                </Link>
                                 <Link className="btn btn-sm bg-white rounded-pill ml-2 pr-3" 
                                 to={'/mon-profil/mes-publications/create'}>
                                    <Icons.Plus className='mr-2' style={{
                                        width:'20px', 
                                        height:'20px', 
                                    }}/> Publication
                                </Link>
                            </>
                        }
                    </div>

                    <span className="d-inline-block d-lg-none text-white">
                        <Icons.Menu size={30} onClick={() => setIsMenuOpen(true)}/>
                    </span>

                </nav>
                {isMenuOpen && 
                    <div className="position-fixed w-100 h-100" style={{
                        top: 0,
                        left: 0,
                        zIndex: 10
                    }}>
                        <div className="position-relative w-100 h-100 bg-white px-4 py-2 
                        d-flex flex-wrap flex-column">
                            <div className="d-flex align-items-center justify-content-between">
                                 <Link className="navbar-brand" to='/'>
                                    <img src={logo} className="site-logo" width={60} /> 
                                </Link>
                                
                                <span className="d-inline-block" onClick={() => setIsMenuOpen(false)}>
                                    <Icons.X size={30}/>
                                </span>
                            </div>
                            <ul className="mt-5 ml-0 navbar-nav">
                                <li className="py-1">
                                    <Link to={'/'} className="nav-link text-secondary" 
                                    style={{fontSize:"1.3rem"}}>
                                        Accueil
                                    </Link>
                                </li>
                                <li className="py-1">
                                    <Link to={'/categories?category=all'} className="nav-link 
                                    text-secondary" style={{fontSize:"1.3rem"}}>
                                        Categories
                                    </Link>
                                </li>
                                <li className="py-1">
                                    <Link to={'/qui-sommes-nous'} className="nav-link text-secondary" 
                                    style={{fontSize:"1.3rem"}}>
                                        Qui sommes nous
                                    </Link>
                                </li>
                                <li className="py-1">
                                    <Link to={'/contactez-nous'} className="nav-link text-secondary" 
                                    style={{fontSize:"1.3rem"}}>
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                            <div className="mt-auto d-flex py-2">
                                {!Utils.Auth.isLoggedIn() && 
                                    <>
                                        <Link className="p-2 text-secondary" to={'/connexion'}>
                                            <Icons.User className='mr-2' style={{
                                                width:'20px', 
                                                height:'20px', 
                                            }}/>
                                            <span className="d-inline-block">Connexion</span>
                                        </Link>
                                        <Link className="p-2 text-secondary" to={'/inscription'}>
                                            <Icons.UserPlus className='mr-2' style={{
                                                width:'20px', 
                                                height:'20px', 
                                            }}/>
                                            <span className="d-inline-block">Inscription</span>
                                        </Link>
                                    </>
                                }
                                

                                {Utils.Auth.isLoggedIn() && 
                                    <>
                                        <Link className="p-2 text-secondary" to={'/mon-profil/modifier'}>
                                            <Icons.User className='mr-2' style={{
                                                width:'20px', 
                                                height:'20px', 
                                            }}/>
                                            <span className="d-inline-block">
                                                {Utils.Auth.getUser()?.nom}
                                            </span>
                                        </Link>
                                         <Link className="btn bg-primary text-white rounded-pill ml-2 pr-3" 
                                         to={'/mon-profil/mes-publications/create'}>
                                            <Icons.Plus className='mr-2' style={{
                                                width:'20px', 
                                                height:'20px', 
                                            }}/> Publication
                                        </Link>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                }
            </>
		)
}