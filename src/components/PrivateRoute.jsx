import { useStore } from '../store';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
    const { currentUser } = useStore();
    return currentUser ? <Outlet /> : <Navigate to='/login' />;
}