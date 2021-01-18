import React from 'react';
import {
  Redirect,
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteMProps,
} from 'react-router-dom';
import { useAuth } from '../hooks/Auth';

interface RouteProps extends ReactDOMRouteMProps{
    isPrivate?: boolean;
    component: React.ComponentType;
}
const Route: React.FC<RouteProps> = ({ isPrivate = false, component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {
      ...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
          <Component />
        ) : (
          <Redirect to={
            {
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: Location },
            }
        } />
        );
      }}
    />
  );
};

export default Route;
