import { Routes, Route } from "react-router-dom"
import { Views } from '../views';
import { Layouts } from '../layouts';
import { useState } from 'react'
import { MainContext } from '../App';


export function MainRoutes() {
	const [IM_recentProducts, setIM_recentProducts] = useState([]);
    const [IM_products, setIM_products] = useState([]);
    const [IM_categories, setIM_categories] = useState([]);

	return (
			<MainContext.Provider value={{
				IM_categories,
				setIM_categories,
				IM_products,
				setIM_products,
				IM_recentProducts,
				setIM_recentProducts
			}}>
				<Layouts.MainLayout>
					<Routes>
						<Route path='' element={<Views.HomeView />}/>
						<Route path='qui-sommes-nous' element={<Views.AboutUsView />}/>
						<Route path='contactez-nous' element={<Views.ContactView />}/>
						<Route path='categories' element={<Views.CategoryListView />}/>
						<Route path='mon-profil/*' element={<Views.PrivateView View={Views.UserProfileView} />}/>
						<Route path='categories' element={<Views.CategoryListView />}/>
						<Route path='publications' element={<Views.ProductListView />}/>
						<Route path='publications/:slug' element={<Views.ProductShowView />}/>
						<Route path='categories/:slug' element={<Views.CategoryEditView />}/>
					</Routes>
				</Layouts.MainLayout>

			</MainContext.Provider>
		)

}