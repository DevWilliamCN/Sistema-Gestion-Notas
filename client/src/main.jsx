import React from 'react';
import ReactDOM from 'react-dom/client';
import Estudiantes from './pages/Estudiantes'; 
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Estudiantes />
  </React.StrictMode>
);
