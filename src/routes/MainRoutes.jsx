import { Routes, Route } from "react-router-dom"
import { Views } from '../views';
import { Layouts } from '../layouts';
import { createContext, useState } from 'react'

export const MainContext = createContext({
	IM_categories:[],
	setIM_categories:[],
	IM_products:[],
	setIM_products:[],
	IM_recentProducts:[],
	setIM_recentProducts:[]
})

export function MainRoutes() {
	const [IM_recentProducts, setIM_recentProducts] = useState([]);
    const [IM_products, setIM_products] = useState([]);

	return (
			<MainContext.Provider value={{
				IM_products,
				setIM_products,
				IM_recentProducts,
				setIM_recentProducts
			}}>
				<Layouts.MainLayout>
					<Routes>
						<Route path='' element={<Views.HomeView />}/>
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