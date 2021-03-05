import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface signIncrendential {
  email: string;
  password: string;
}

interface AutoContextData{
    user: object;
    signIn(crendential: signIncrendential): Promise<void>;
    signOut(): void;
    loding: boolean;
  }

const AuthContext = createContext<AutoContextData>({} as AutoContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loding, setLoding] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
          '@Gobarber:token',
          '@Gobarber:user',
        ]);
        if (token[1] && user[1]) {
          setData({ token: token[1], user: JSON.parse(user[1]) })
      }
      setLoding(false);
    }
    loadStorageData();
  },[])

  const signIn = useCallback(async({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });
    const { token, user } = (response.data);
    await AsyncStorage.multiSet([
      ['@Gobarber:token', token],
      ['@Gobarber:user', JSON.stringify(user)],
    ]);
    setData({ token, user });
  },[]);
  const signOut = useCallback(async() => {
    await AsyncStorage.multiRemove(['@Gobarber:user','@Gobarber:token']);
    setData({} as AuthState);
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, loding, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
function useAuth(): AutoContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
