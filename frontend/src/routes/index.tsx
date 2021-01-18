import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from '../pages/Signin';
import SignUp from '../pages/Signup';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />
  </Switch>
);
export default Routes;
