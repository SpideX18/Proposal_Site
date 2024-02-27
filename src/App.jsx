import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoveNote from './LoveNote';
// Import other components as needed

// Define your routes in an array
const routeConfig = [
  {
    path: '/:name/:id',
    element: <LoveNote />,
  },
  // Add more route objects here as needed
  // Example:
  // {
  //   path: '/about',
  //   element: <About />,
  // },
];

function App() {
  return (
    <Router>
      <Routes>
        {routeConfig.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
