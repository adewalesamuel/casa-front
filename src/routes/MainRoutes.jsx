import { Routes, Route } from "react-router-dom"
import { Views } from '../views';
import { Layouts } from '../layouts';

export function MainRoutes() {
	return (
			<Layouts.MainLayout>
				<Routes>
					<Route path='' element={<Views.HomeView />}/>
					<Route path='categories' element={<Views.CategoryListView />}/>
					<Route path='categories' element={<Views.CategoryListView />}/>
					<Route path='publications/:slug' element={<Views.ProductShowView />}/>
					<Route path='categories/:slug' element={<Views.CategoryEditView />}/>
				</Routes>
			</Layouts.MainLayout>
		)

}