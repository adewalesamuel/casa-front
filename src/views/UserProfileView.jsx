import { NavLink, Routes, Route } from 'react-router-dom';
import * as Icons from 'react-feather';
import { Views } from '.';

export function UserProfileView() {
	const defaultClasses = "d-flex justify-content-between align-items-center p-3";
	const activeClasses = " bg-primary text-white";

	return (
			<section id="profile">
				<div className="row">
					<div className="col-4 d-none d-md-block">
						<ul className="list-group">
						  <li className="list-group-item p-0">
						    <NavLink to='/mon-profil/modifier' className={({isActive}) => isActive ? 
						    `${defaultClasses + activeClasses}` : defaultClasses}>
						    	Mon profil <Icons.ChevronRight />
						    </NavLink>
						  </li>
						  <li className="list-group-item p-0">
						    <NavLink to='/mon-profil/mes-publications' className={({isActive}) => isActive ? 
						    `${defaultClasses + activeClasses}` : defaultClasses}>
						    	Mes publications <Icons.ChevronRight />
						    </NavLink>
						  </li>
						</ul>
					</div>
					<div className='col-lg-8 col-12'>
						<Routes>
							<Route path='modifier' element={<Views.UserEditView />}/>
						</Routes>
					</div>
				</div>
			</section>
		)
}