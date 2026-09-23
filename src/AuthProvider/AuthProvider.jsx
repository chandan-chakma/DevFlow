import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext.jsx';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.comfig.js';

const AuthProvider = ({ children }) => {
    // state the user 
    const [user, setUser] = useState(null);
    // create user using email and passward 
    const createEmailUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    };

    // sign in user with email and password

    const signInWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    };

    // logOut
    const logOut = () => {
        return signOut(auth);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
    },[])


    const authInfo = {
        user,
        createEmailUser,
        signInWithEmail,
        logOut
    }
    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;