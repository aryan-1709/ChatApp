import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FrontPage from "../component/FrontPage";
import { Users } from "../Context/UsersContext";
import { UseSocket } from "../Context/socketContext";

const Routers = () => {
  return (
    <Router>
      <UseSocket>
        <Users>
          <Routes>
            <Route exact path="/in" element={<FrontPage />} />
          </Routes>
        </Users>
      </UseSocket>
    </Router>
  );
};

export default Routers;
