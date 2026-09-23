import React, { useContext } from 'react';
import { AuthContext } from '../AuthProvider/AuthContext.jsx';

const UseAuth = () => {
    const authInfo = useContext(AuthContext)
    return authInfo
};

export default UseAuth;