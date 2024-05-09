import { useLocation, Link } from 'react-router-dom';
import { Components } from '.';
import { useEffect } from 'react';
import logo from '../assets/img/logo-mobile.png';

export function MobileHeader() {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [pathname])

    if (pathname.startsWith('/mobile/publications/'))
        return null;

	return (
			<header id="mobileHeader" className="bg-primary position-relative p-2">
                <div className="d-flex justify-content-between">
                    <Link className="navbar-brand pill bg-white px-3 rounded-md" 
                    to='/mobile'>
                        <img src={logo} className="site-logo" width={60} /> 
                    </Link>
                </div>
                
                <Components.MobileHeroSection />
            </header>  
		)
}