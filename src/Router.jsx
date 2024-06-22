import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import Update from './components/Update';

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path='/' element={<App />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/update' element={<Update />} />
            </Routes>
        </BrowserRouter>
    );
}