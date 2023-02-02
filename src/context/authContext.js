import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged, 
    signOut,
    GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { auth } from "../firebase";

export const authContext = createContext();

export const useAuth = () => {
    const context =  useContext(authContext);
    if(!context) throw new Error('There is not auth provider')
    return context;
}


export function AuthProvider ({children}) {
    const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password)
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password)
    const logout = () => signOut(auth);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider();
        signInWithPopup(auth, googleProvider)
    }

    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
        });
        return () => unSubscribe();
    }, [])
    
    return(
        <authContext.Provider value={{signUp, login, logout, user, loading, loginWithGoogle}}>
            {children}
        </authContext.Provider>
    )
}