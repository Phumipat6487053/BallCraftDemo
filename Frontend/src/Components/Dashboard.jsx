import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import RequirementPage from './RequirementPage';
import './CSS/Dashboard.css';

const Dashboard = () => {
  const location = useLocation();

  const [showDropdown, setShowDropdown] = useState(false); // State to toggle Work Product dropdown
  const [showOverviewDropdown, setShowOverviewDropdown] = useState(false); // State to toggle Overview dropdown
  const [selectedSection, setSelectedSection] = useState(localStorage.getItem('selectedSection') || 'Dashboard');

  const queryParams = new URLSearchParams(location.search);
  const projectName = queryParams.get('project');

  useEffect(() => {
    localStorage.setItem('selectedSection', selectedSection);
  }, [selectedSection]);

  // Toggle for Work Product dropdown
  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
    setShowOverviewDropdown(false); // Close Overview dropdown when Work Product dropdown opens
  };

  // Toggle for Overview dropdown
  const handleOverviewDropdownToggle = () => {
    setShowOverviewDropdown((prev) => !prev);
    setShowDropdown(false); // Close Work Product dropdown when Overview dropdown opens
  };

  // Handle dropdown item click
  const handleDropdownItemClick = (section) => {
    setSelectedSection(section);
    setShowDropdown(false); // Close dropdown after selecting
    setShowOverviewDropdown(false); // Close Overview dropdown after selecting
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="navbar2">
        {projectName && <div className="nav-project-name">{projectName}</div>}

        <div
          className={`nav-link ${selectedSection === 'Project' ? 'active' : ''}`}
          onClick={() => setSelectedSection('Project')}
        >
          Project
        </div>

        {/* Overview Dropdown */}
        <div
          className={`nav-link dropdown-container ${showOverviewDropdown ? 'open' : ''}`}
          onClick={handleOverviewDropdownToggle}
        >
          Overview
          {showOverviewDropdown && (
            <div className="dropdown-menu overview-dropdown">
              <div
                className={`dropdown-item ${selectedSection === 'Dashboard' ? 'active' : ''}`}
                onClick={() => handleDropdownItemClick('Dashboard')}
              >
                Dashboard
              </div>
              <div
                className={`dropdown-item ${selectedSection === 'Guide' ? 'active' : ''}`}
                onClick={() => handleDropdownItemClick('Guide')}
              >
                Guide
              </div>
            </div>
          )}
        </div>

        {/* Work Product Dropdown */}
        <div
          className={`nav-link dropdown-container ${showDropdown ? 'open' : ''}`}
          onClick={handleDropdownToggle}
        >
          Work Product
          {showDropdown && (
            <div className="dropdown-menu workproduct-dropdown">
              {['Requirement', 'Design', 'Implementation', 'Testcase', 'Review', 'Baseline', 'Traceability'].map((section) => (
                <div
                  key={section}
                  className={`dropdown-item ${selectedSection === section ? 'active' : ''}`}
                  onClick={() => handleDropdownItemClick(section)}
                >
                  {section}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Section */}
      <div className="content-container">
        {selectedSection === 'Project' && <h2>Project Information</h2>}
        {selectedSection === 'Overview' && <h2>Project Overview</h2>}
        {selectedSection === 'Dashboard' && <h2>Dashboard Overview</h2>}
        {selectedSection === 'Guide' && <h2>Guide Content</h2>}
        {selectedSection === 'Requirement' && <RequirementPage />}
        {selectedSection === 'Design' && <div>Design Section Content</div>}
        {selectedSection === 'Implementation' && <div>Implementation Artifact</div>}
        {selectedSection === 'Testcase' && <div>Testcase Content</div>}
        {selectedSection === 'Review' && <div>Review Content</div>}
        {selectedSection === 'Baseline' && <div>Baseline Content</div>}
        {selectedSection === 'Traceability' && <div>Traceability Content</div>}
      </div>
    </div>
  );
};

export default Dashboard;
