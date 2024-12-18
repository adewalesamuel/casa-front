import { NavLink, Routes, Route, useLocation } from 'react-router-dom';
import * as Icons from 'react-feather';
import { Views } from '.';
import { Utils } from '../utils';
import { Services } from '../services';
import { useNavigate } from 'react-router-dom';
import { CONSTS } from '../constants';
import { useState } from 'react';

export function UserProfileView() {
	const abortController = new AbortController();
    const {pathname} = useLocation();

	const navigate = useNavigate();

	const [isMobile,] = useState(pathname.startsWith('/mobile'));

	const defaultClasses = "d-flex justify-content-between align-items-center p-3 btn rounded-0";
	const activeClasses = " bg-primary text-white";

	const handleLogout = e => {
		e.preventDefault();

		if (!confirm('Voulez vous vraiment vous deconnecter ?')) return;

		Services.AuthService.logout('', abortController.signal);

		Utils.Auth.removeSessionToken();
		navigate(`/${isMobile ? 'mobile' : ''}`, {replace:true});
	}

	return (
			<section id="profile">
				<div className="row">
					<div className="col-md-4 col-12 mb-4">
						<ul className="list-group">
							<li className="list-group-item p-0">
								<NavLink to={`${isMobile ? '/mobile' : ''}/mon-profil/modifier`} 
								className={({isActive}) => isActive ? 
								`${defaultClasses + activeClasses}` : defaultClasses}>
									Mon profil <Icons.ChevronRight />
								</NavLink>
							</li>
							{Utils.Auth.getUser().type === CONSTS.USER.TYPES.VENDEUR &&
								<>
									<li className="list-group-item p-0">
										<NavLink to={`${isMobile ? '/mobile' : ''}/mon-profil/mon-compte`} className={({isActive}) => isActive ? 
										`${defaultClasses + activeClasses}` : defaultClasses}>
											Mon compte <Icons.ChevronRight />
										</NavLink>
									</li>
									<li className="list-group-item p-0">
										<NavLink to={`${isMobile ? '/mobile' : ''}/mon-profil/mes-publications`} className={({isActive}) => isActive ? 
										`${defaultClasses + activeClasses}` : defaultClasses}>
											Mes publications <Icons.ChevronRight />
										</NavLink>
									</li>
								</>
							}
							<li className="list-group-item p-0">
								<span className={`${defaultClasses} text-danger`} onClick={handleLogout}>
									Deconnexion <Icons.LogOut />
								</span>
							</li>
						</ul>
					</div>
					<div className='col-lg-8 col-12'>
						<Routes>
							<Route path='modifier' element={<Views.UserEditView />}/>
							<Route path='mon-compte' element={<Views.TransactionListView />}/>
							<Route path='mes-publications' element={<Views.UserProductListView />}/>
							<Route path='mes-publications/create' element={<Views.ProductCreateView />}/>
							<Route path='mes-publications/:id/edit/*' element={<Views.ProductEditView />}/>
						</Routes>
					</div>
				</div>
			</section>
		)
}