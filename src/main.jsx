import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Rou, Route, Routes } from 'react-router-dom';
import App from './App';
import Results from './Results';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Router basename={import.meta.env.BASE_URL}>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  </Router>
);
