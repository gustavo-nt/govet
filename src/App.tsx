import React from 'react';
import Modal from "react-modal";
import { BrowserRouter } from 'react-router-dom';

import GlobalStyle from './styles/global';

import AppProvider from './hooks';

import Routes from './routes';

Modal.setAppElement('#root');

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <Routes />
    </AppProvider>

    <GlobalStyle />
  </BrowserRouter>
);

export default App;
