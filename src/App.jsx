import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Routes as AppRoutes } from './routes';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<AppRoutes.MainRoutes />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
