import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Routes as AppRoutes } from './routes';
import { Views } from "./views";
import { createContext } from 'react'

export const MainContext = createContext({
    IM_categories:[],
    setIM_categories:[],
    IM_products:[],
    setIM_products:[],
    IM_recentProducts:[],
    setIM_recentProducts:[]
})

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/connexion' element={<Views.LoginView />} />
                <Route path='/inscription' element={<Views.RegisterView />} />
                <Route path='/mobile/*' element={<AppRoutes.MobileRoutes />} />
                <Route path='*' element={<AppRoutes.MainRoutes />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
