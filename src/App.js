import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CocktailList from './components/CocktailList';
import CocktailDetails from './components/CocktailDetails';
import "./App.css";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the cocktail list */}
        <Route path="/" element={<CocktailList />} />

        {/* Route for cocktail details, expecting an "id" parameter */}
        <Route path="/:id" element={<CocktailDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
