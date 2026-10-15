import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext.jsx';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.comfig.js';
import Loading from '../Components/Loading/Loading.jsx';

const AuthProvider = ({ children }) => {
    // state the user 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // create user using email and passward 
    const createEmailUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    };

    // sign in user with email and password

    const signInWithEmail = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };

    // update user in firebase for show displayName 
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    }

    // logOut
    const logOut = () => {
        return signOut(auth);
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
    },[])


    const authInfo = {
        user,
        loading,
        createEmailUser,
        signInWithEmail,
        updateUserProfile,
        logOut
    }
    return (
        <AuthContext value={authInfo}>
            {loading?<Loading></Loading>: children}
        </AuthContext>
    );
};

export default AuthProvider;