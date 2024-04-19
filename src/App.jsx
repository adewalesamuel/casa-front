import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Routes as AppRoutes } from './routes';
import { Views } from "./views";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/connexion' element={<Views.LoginView />} />
                <Route path='/inscription' element={<Views.RegisterView />} />
                <Route path='*' element={<AppRoutes.MainRoutes />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
