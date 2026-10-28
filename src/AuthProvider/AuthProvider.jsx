import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext.jsx';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.comfig.js';
import Loading from '../Components/Loading/Loading.jsx';
import UseAxiosSecures from '../Hooks/UseAxiosSecures.jsx';
import { useQueryClient } from '@tanstack/react-query';

const AuthProvider = ({ children }) => {
    const axiosSecure = UseAxiosSecures();
    // state the user 
    const [user, setUser] = useState(null);
    const [authActionLoading, setAuthActionLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    // create user using email and passward 
    const createEmailUser = async(email, password) => {
        setAuthActionLoading(true);
        try {
            return await createUserWithEmailAndPassword(auth, email, password);
        } finally {
            setAuthActionLoading(false);
        }
    };

    // sign in user with email and password

    const signInWithEmail = (email, password) => {
        setAuthActionLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
  
    };

    // update user in firebase for show displayName 
    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile);
    }

    // logOut
    const queryClient = useQueryClient();

    const logOut = async () => {
        setAuthActionLoading(true);
        try {
            await signOut(auth);
            queryClient.clear();       // ✅ THE fix
        } finally {
            setAuthActionLoading(false);
        }
    }
    // const logOut = () => {
    //     setAuthActionLoading(true)
    //     return signOut(auth);  
    // }

    useEffect(() => {
        const unSubcribe=onAuthStateChanged(auth, async(currentUser) => {
            setUser(currentUser);
            try {
                if (currentUser) {
                    const res = await axiosSecure.post('/getToken', {
                        email: currentUser.email
                    });

                    console.log('Token response:', res.data);
                }
            } catch (error) {
                console.error('Failed to get token:', error);
            } finally {
                setLoading(false);
            }
        });
        return () => {
            unSubcribe();
        }
    },[])


    const authInfo = {
        user,
        loading,
        authActionLoading,
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