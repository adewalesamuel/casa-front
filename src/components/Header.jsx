import { useLocation } from 'react-router-dom';
import { Components } from '.';
import { useEffect } from 'react';

export function Header() {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo({top: 0});
    }, [pathname])

	return (
			<header id="mainHeader" className="bg-primary position-relative">
                <div className="position-absolute bg-primary w-100 h-100" 
                style={{top:0, left:0, opacity: 0.7}}></div>
                <div className="container position-relative">
                    <Components.MainMenu />
                    <Components.HeroSection />
                </div>
            </header>  
		)
}