import React from 'react';
import { render } from 'react-dom';
import Example from './components/Example';
import ErrorBoundary from './ErrorBoundary';

render(
  <ErrorBoundary>
    <Example />
  </ErrorBoundary>,
  document.getElementById('root'),
);
