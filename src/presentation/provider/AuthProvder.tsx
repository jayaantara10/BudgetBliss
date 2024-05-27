import {View, Text} from 'react-native';
import React, {createContext, useContext, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import Page from '../components/container/Page';

// Make alias for auth context props
interface AuthContextProps {
  user: any;
  initializing: boolean;
}

// Make alias for auth provider props
interface AuthProviderProps {
  children: React.ReactNode;
}

// Make context
const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvder = ({children}: AuthProviderProps) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <AuthContext.Provider value={{user, initializing}}>
      {children}
    </AuthContext.Provider>
  );
};

// Make use auth instance for access provider state in any screens
export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    const errorMessage =
      "Auth Error: 'useAuth' must be used within a AuthProvider";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
  return context;
};

export default AuthProvder;
