import { useState, useEffect, createContext, ReactElement} from "react";
import { onAuthStateChanged, User} from "firebase/auth";
import { auth } from "./../firebase/firebase"

type AuthProviderProps = {
    children: ReactElement;
}


export const AuthContext = createContext<string | null>(null);

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [currentUser, setCurrentUser]=useState<string | null>(null);

     useEffect(() => {
			const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
        if(user){
          setCurrentUser(user.uid);
        }
			});
			return unsubscribe;
		}, [])


  return (
    <AuthContext.Provider value={currentUser}>
            {children}
    </AuthContext.Provider>
  )
}

