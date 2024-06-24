import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FirstPage from '../component/FirstPage';
import FrontPage from '../component/FrontPage';

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path ="/" element={<FirstPage />} />
        <Route path="/in" element={<FrontPage />} />
      </Routes>
    </Router>
  );
};

export default Routers;
