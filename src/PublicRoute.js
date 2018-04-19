import React, {Component} from 'react';
import {Route} from "react-router-dom";

export const PublicRoute = ({component: Component, ...rest}) => {
  return (
    <Route
      { ...rest }
      render={ props =>
        <Component { ...props } { ...rest }/>
      }
    />
  )
};