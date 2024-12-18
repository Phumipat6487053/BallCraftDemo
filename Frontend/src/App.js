import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateProject from './Components/CreateProject';
import CreateRequirement from './Components/CreateRequirement';
import RequirementPage from './Components/RequirementPage';
import UpdateRequirement from './Components/UpdateRequirement';
import Project from './Components/Project';
import Navbar from './Components/Navbar';
import Dashboard from './Components/Dashboard';
import UpdateProject from './Components/UpdateProject';

const App = () => {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Route for Project listing */}
        <Route path="/" element={<Project />} />

        {/* Routes for Project management */}
        <Route path="/CreateProject" element={<CreateProject />} />
        <Route path="/UpdateProject/:id" element={<UpdateProject />} />

        {/* Route for Dashboard */}
        <Route path="/Dashboard" element={<Dashboard />} />

        {/* Routes for Requirements */}
        <Route path="/RequirementPage" element={<RequirementPage />} />
        <Route path="/CreateRequirement" element={<CreateRequirement />} />
        <Route path="/UpdateRequirement/:id" element={<UpdateRequirement />} />
      </Routes>
    </Router>
  );
};

export default App;
