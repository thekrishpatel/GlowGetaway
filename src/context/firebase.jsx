import React, { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { getDatabase, set, ref, get } from 'firebase/database';

// Firebase config
const firebaseConfig = {
    // Your data
};

// Initialize Firebase app || get authentiaction || get database
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider()

// Create Firebase context
const FirebaseContext = createContext(null);

// Custom hook to use Firebase
export const useFirebase = () => useContext(FirebaseContext)


export const FirebaseProvider = (props) => {

    const [user, setUser] = useState(null);

    // Signup with email and password
    const signupUserWithEmailAndPassword = async (email, password) => {
        try {
            const userdata = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            console.log("Sign up Success");
            return userdata.user;
        } catch (err) {
            return console.log(err);
        }
    };

    // Add data to the Firebase Realtime Database
    const putData = (key, data) => set(ref(db, key), data);

    // Signup with Google
    const signupWithGoogle = () => {
        return signInWithPopup(firebaseAuth, googleProvider)
    }

    // Login with email and password
    const loginUserWithEmailAndPassword = async (email, password) => {
        try {
            await signInWithEmailAndPassword(firebaseAuth, email, password);
            return console.log("Login Success");
        } catch (err) {
            return console.log(err);
        }
    }

    // Logout function
    const logoutUser = async () => {
        try {
            await signOut(firebaseAuth);
            return console.log("Logout successful");
        } catch (err) {
            return console.error(err);
        }
    };

    // Track authentication state
    useEffect(() => {
        return onAuthStateChanged(firebaseAuth, (currentUser) => {
            if (currentUser) {
                // User is logged in
                console.log("User logged in:", currentUser);
                setUser(currentUser);
            } else {
                // User is logged out
                console.log('User logged out');
                setUser(null);
            }
        });
    }, []);

    // get user profile
    const getUserData = async (uid) => {
        const userRef = ref(db, `users/${uid}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log('No data available for this user');
            return null;
        }
    };

    return (
        <FirebaseContext.Provider value={{ signupUserWithEmailAndPassword, putData, signupWithGoogle, loginUserWithEmailAndPassword, logoutUser, user, getUserData }}>
            {props.children}
        </FirebaseContext.Provider>
    );
};