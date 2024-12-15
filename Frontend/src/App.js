import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Home from './Components/Home';
import Testplan from './Components/Testplans';
import CreateProject from './Components/CreateProject';
import UpdateTestplan from './Components/UpdateTestplan';
import Requirement from './Components/requirementPage';
import Project from './Components/Project';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '250px', padding: '20px' }}>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/project" element={<Project />} />
            <Route path="/test-plans" element={<Testplan />} />
            <Route path="/CreateProject" element={<CreateProject />} />
            <Route path="/UpdateTestplan/:id" element={<UpdateTestplan />} />
            <Route path="requirementPage" element={<Requirement />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
