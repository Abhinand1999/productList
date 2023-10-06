import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Homepage from './components/Homepage';
import AddCategory from './components/AddCategory';
import AddProduct from './components/AddProduct';

function App() {
  
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/add-category" element={<AddCategory />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
