import React from 'react';
import GlobalStyle from './styles/Global';
import Signin from './pages/Signin';
/* import Signup from './pages/Signup'; */

const App: React.FC = () => (
  <>
    <Signin />
    <GlobalStyle />
  </>
);

export default App;
