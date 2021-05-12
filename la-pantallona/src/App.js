import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import { Header } from './components/common';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Toaster } from 'react-hot-toast';

const App = () => {

  let ssValue = sessionStorage.getItem('isAuth');
  let isAuth = false;
  
  if (ssValue === 'true') {
    isAuth = true;
  }

  else {
    isAuth = false;
  }

  return (
    <BrowserRouter>
      <div className="bg-color">
        { isAuth ? <Header /> : null }
        <Routes />
        <Toaster 
          position="top-center"
          reverseOrder={false}
        />
      </div>
    </BrowserRouter>
  )
};

export default App;