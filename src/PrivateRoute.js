import React, {Component} from 'react';
import {Route, Redirect} from "react-router-dom";

export const PrivateRoute = ({component: Component, ...rest}) => {
  const {isAuthenticated, redirectRoute = '/login'} = rest;
  return (
    <Route
      { ...rest }
      render={ props =>
        isAuthenticated
          ? <Component { ...props } { ...rest }/>
          : (
            <Redirect
              to={ {
                pathname: redirectRoute,
                state: {from: props.location}
              } }
            />
          )
      }
    />
  )
};