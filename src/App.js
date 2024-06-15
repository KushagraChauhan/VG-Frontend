import React from 'react';
import {BrowserRouter as Router, Routes, Route, useRoutes} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginOrRegisterPage from './pages/LoginOrRegisterPage';
import Home from './pages/Home';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" element = {<Home />}></Route>
          <Route path = "/welcome" element = {<LoginOrRegisterPage />} ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
