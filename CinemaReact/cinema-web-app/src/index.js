import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Importa lo styling di Bootstrap per il layout
import 'bootstrap/dist/css/bootstrap.min.css'; 

import App from './App';
// Importa BrowserRouter per abilitare la navigazione basata su URL
import { BrowserRouter } from 'react-router-dom';

// Importiamo gli strumenti per collegare Redux a React
import { Provider } from 'react-redux';
import { store } from './redux/store'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 1. Avvolge l'App con il Provider Redux per accedere allo Store */}
    <Provider store={store}> 
      {/* 2. Avvolge tutto con BrowserRouter per abilitare le rotte */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
