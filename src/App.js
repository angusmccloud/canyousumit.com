import React from 'react';
import { HomePage } from './pages';
import { ViewportProvider } from './utils';

const App = () => {
  return (
    <ViewportProvider>
      <HomePage />
    </ViewportProvider>
  );
}

export default App;
