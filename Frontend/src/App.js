import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Home from './Components/Home';
import Testplan from './Components/Testplans';
import CreateProject from './Components/CreateProject';
import UpdateTestplan from './Components/UpdateTestplan';
import Requirement from './Components/requirementPage';
import Project from './Components/Project';
import Navbar from './Components/Navbar';
import UpdateProject from './Components/UpdateProject';

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path='/' element={<Project />} />
        <Route path="/CreateProject" element={<CreateProject />} />
        <Route path="/UpdateProject/:id" element={<UpdateProject />} />
      </Routes>
    </Router>
  );
}

export default App;
