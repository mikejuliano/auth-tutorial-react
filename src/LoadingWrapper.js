import React from 'react';

export const Loading = ({}) => <h3>Loading...</h3>;

export const LoadingWrapper = ({isLoading, children}) => {
  return isLoading ? <Loading/> : children;
};