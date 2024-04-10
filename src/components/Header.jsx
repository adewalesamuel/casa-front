import { Link } from "react-router-dom";
import logo from '../assets/logo.jpeg';
import * as Icons from 'react-feather';
import placeholderImg from '../assets/img/placeholder.webp';
import { Components } from '.';

export function Header() {
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