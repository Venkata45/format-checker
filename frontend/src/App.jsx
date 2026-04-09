import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormatChecker from './pages/FormatChecker';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormatChecker />} />
      </Routes>
    </Router>
  );
}

export default App;
