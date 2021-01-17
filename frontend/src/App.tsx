import React from 'react';
import GlobalStyle from './styles/Global';
import Signin from './pages/Signin';
/* import Signup from './pages/Signup'; */
import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <Signin />
    </AuthProvider>
    <GlobalStyle />
  </>
);

export default App;
