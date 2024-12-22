import { useState, useEffect, createContext, ReactElement} from "react";
import { onAuthStateChanged, User} from "firebase/auth";
import { auth } from "./../firebase/firebase"
import { getDoc, doc } from "firebase/firestore";
import { db } from "./../firebase/firebase";

type AuthProviderProps = {
    children: ReactElement;
}

type AuthContextType = {
  uid: string | null,
  role: string | null,

}

const fetchCurrentUserRole = async (uid: string) => {
  try{
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log(data)
        if(data.role){
          return data.role
        }else{
          return "user"
        }
        } else {
            return "user"
      } 
    }catch (error) {
        return "user"
        }

}

export const AuthContext = createContext<AuthContextType>({uid: null, role: null});

export const AuthProvider = ({children}: AuthProviderProps) => {
    const [currentUser, setCurrentUser]=useState<AuthContextType>({uid: null, role: null});

     useEffect(() => {
      const fetchUserData = async (user: User) => {
            const role = await fetchCurrentUserRole(user.uid);
            setCurrentUser({ uid: user.uid, role });
        };

			const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
        if(user){
          fetchUserData(user);
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

