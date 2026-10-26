import React from 'react';
import UseAuth from '../Hooks/UseAuth.jsx';
import { Navigate, useLocation } from 'react-router';
import Loading from '../Components/Loading/Loading.jsx';

const PrivateRoute = ({children}) => {
    const { user, loading } = UseAuth();
    const location = useLocation();

    if (loading) {
        return <Loading></Loading>
    }

    if (user) {
        return children
        
    }

    return <Navigate state={location.pathname} to='/login'></Navigate>
   
};

export default PrivateRoute;