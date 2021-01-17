import React, { createContext, useCallback } from 'react';
import api from '../services/api';

interface signIncrendential {
  email: string;
  password: string;
}

interface AutoContextData{
    name: string;
    signIn(crendential: signIncrendential): Promise<void>;

}
const AutoContext = createContext<AutoContextData>({} as AutoContextData);

const AuthProvider: React.FC = ({ children }) => {
  const signIn = useCallback(async({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });
    console.log(response.data);
  },[]);
  return (
    <AutoContext.Provider value={{ name: 'Diego', signIn }}>
      {children}
    </AutoContext.Provider>
  );
};

export { AutoContext, AuthProvider };
