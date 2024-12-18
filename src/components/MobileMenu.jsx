import { NavLink } from "react-router-dom";
import * as Icons from 'react-feather';

export function MobileMenu() {
	return (
			<div className="fixed-bottom w-100">
				<nav className="d-flex bg-white shadow-lg flex-row 
				justify-content-between p-2">
					<NavLink to="/mobile" className="d-flex flex-column 
					justify-content-center align-items-center text-secondary">
						<Icons.Home size={25} className=""/>
						<small className="text-uppercase ">Accueil</small>
					</NavLink>
					<NavLink to="/mobile/categories" className="d-flex flex-column 
					justify-content-center align-items-center text-secondary">
						<Icons.Box size={25} className=""/>
						<small className="text-uppercase ">Categories</small>
					</NavLink>

					<NavLink to="/mobile/favoris" className="d-flex flex-column 
					justify-content-center align-items-center text-secondary">
						<Icons.Heart size={25} className=""/>
						<small className="text-uppercase ">Favoris</small>
					</NavLink>
					<NavLink to="/mobile/mon-profil" className="d-flex flex-column 
					justify-content-center align-items-center text-secondary">
						<Icons.User size={25} className=""/>
						<small className="text-uppercase ">Profil</small>
					</NavLink>

				</nav>
			</div>
		)
}