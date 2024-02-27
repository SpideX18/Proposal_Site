// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoveNote from './LoveNote'; // Import your LoveNote component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user/*" element={<LoveNote />} />
      </Routes>
    </Router>
  );
}

export default App;
