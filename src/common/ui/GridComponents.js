import React from 'react';
import compact from 'lodash/compact';

const isXyGrid = true;
const isFlexGrid = true;

export const Container = ({children, inactive}) => {
  const containerClass = !inactive && isXyGrid ? 'grid-container' : '';

  return (
    <div className={ containerClass }>
      { children }
    </div>
  );
};

export const Row = ({children}) => {
  const rowClass = `${isXyGrid ? 'grid-x grid-padding-x' : ''} ${isFlexGrid ? 'row' : ''}`;
  return (
    <div className={ rowClass }>
      { children }
    </div>
  );
};

export const Column = ({small, medium, large, children}) => {
  const columnClass = `${isXyGrid ? 'cell' : ''} ${isFlexGrid ? 'column' : ''}`;
  const classes = compact([
    columnClass,
    small ? `small-${small}` : null,
    medium ? `medium-${medium}` : null,
    large ? `large-${large}` : null,
  ]).join(' ');

  return (
    <div className={ classes }>
      { children }
    </div>
  );
};