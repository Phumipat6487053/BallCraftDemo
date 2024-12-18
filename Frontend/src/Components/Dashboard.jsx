import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './CSS/Dashboard.css';
import RequirementPage from './requirementPage';

const Dashboard = () => {
  const location = useLocation();
  const [selectedSection, setSelectedSection] = useState(localStorage.getItem('selectedSection') || 'Overview');

  const queryParams = new URLSearchParams(location.search);
  const projectName = queryParams.get('project');

  useEffect(() => {
    localStorage.setItem('selectedSection', selectedSection);
  }, [selectedSection]);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <nav className="sidebar">
        {/* Project Name */}
        {projectName && <div className="sidebar-project-name">{projectName}</div>}

        {/* Project Section */}
        <div className="sidebar-section-title">PROJECT</div>
        <div
          className={`nav-link ${selectedSection === 'Overview' ? 'active' : ''}`}
          onClick={() => setSelectedSection('Overview')}
        >
          Overview
        </div>
        <div
          className={`nav-link ${selectedSection === 'Documentation' ? 'active' : ''}`}
          onClick={() => setSelectedSection('Documentation')}
        >
          Documentation
        </div>

        {/* Management Section */}
        <div className="sidebar-section-title">WORK PRODUCT</div>
        <div
          className={`nav-link ${selectedSection === 'Requirement' ? 'active' : ''}`}
          onClick={() => setSelectedSection('Requirement')}
        >
          Requirement
        </div>
        <div
          className={`nav-link ${selectedSection === 'Design' ? 'active' : ''}`}
          onClick={() => setSelectedSection('Design')}
        >
          Design
        </div>
        <div
          className={`nav-link ${selectedSection === 'Implementation' ? 'active' : ''}`}
          onClick={() => setSelectedSection('Implementation')}
        >
          Implementation
        </div>
        <div
          className={`nav-link ${selectedSection === 'Test case' ? 'active' : ''}`}
          onClick={() => setSelectedSection('Testcase')}
        >
          Test case
        </div>
        <div
          className={`nav-link ${selectedSection === 'Review' ? 'active' : ''}`}
          onClick={() => setSelectedSection('Review')}
        >
          Review
        </div>
        <div
          className={`nav-link ${selectedSection === 'Baseline' ? 'active' : ''}`}
          onClick={() => setSelectedSection('Baseline')}
        >
          Baseline
        </div>
        <div
          className={`nav-link ${selectedSection === 'Traceability' ? 'active' : ''}`}
          onClick={() => setSelectedSection('Traceability')}
        >
          Traceability
        </div>

        {/* Automation Section */}
        <div className="sidebar-section-title">GUIDES</div>
        <div
          className={`nav-link ${selectedSection === 'Guide Tutorial' ? 'active' : ''}`}
          onClick={() => setSelectedSection('Guide Tutorial')}
        >
          Guide Tutorial
        </div>
      </nav>

      {/* Main Content Section */}
      <div className="content-container">
        {selectedSection === 'Overview' && <h2>Overview Content</h2>}
        {selectedSection === 'Documentation' && <h2>Documentation Content</h2>}
        {selectedSection === 'Requirement' && <RequirementPage />}
        {selectedSection === 'Design' && <h2>Design</h2>}
        {selectedSection === 'Implementation' && <h2>Implementation</h2>}
        {selectedSection === 'Testcase' && <h2>Test case</h2>}
        {selectedSection === 'Review' && <h2>Review</h2>}
        {selectedSection === 'Baseline' && <h2>Baseline</h2>}
        {selectedSection === 'Traceability' && <h2>Traceability</h2>}
      </div>
    </div>
  );
};

export default Dashboard;
