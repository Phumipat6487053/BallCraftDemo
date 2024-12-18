import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './CSS/RequirementPage.css';

const RequirementPage = () => {
  const [requirementList, setRequirementList] = useState([]);
  const [filteredRequirements, setFilteredRequirements] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch requirements on initial load
  useEffect(() => {
    axios
      .get('http://localhost:3001/requirement')
      .then((res) => {
        setRequirementList(res.data);
        setFilteredRequirements(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Handle search filtering
  useEffect(() => {
    if (searchQuery === '') {
      setFilteredRequirements(requirementList);
    } else {
      setFilteredRequirements(
        requirementList.filter((requirement) =>
          requirement.requirement_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, requirementList]);

  // Handle navigate to requirement detail
  const handleNavigateToDetail = (requirementId) => {
    navigate(`/RequirementDetail/${requirementId}`);
  };

  // Handle requirement deletion
  const handleDelete = (requirementId) => {
    axios
      .delete(`http://localhost:3001/requirement/${requirementId}`)
      .then((response) => {
        console.log('Requirement deleted:', response.data);
        setRequirementList(requirementList.filter((req) => req.requirement_id !== requirementId));
        setFilteredRequirements(filteredRequirements.filter((req) => req.requirement_id !== requirementId));
      })
      .catch((err) => {
        console.log('Error deleting requirement:', err);
      });
  };

  return (
    <div className="requirement-container">
      <div className="top-section">
        <h1 className="requirement-title">Requirements</h1>
        <button onClick={() => navigate('/CreateRequirement')} className="create-requirement-btn">
          Create Requirement
        </button>
      </div>

      <div className="content-container">
        <div className="requirement-search-section">
          <div className="requirement-search">
            <input
              type="text"
              className="requirement-search-input"
              placeholder="Search Requirement"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          </div>

          {loading ? (
            <p>Loading requirements...</p>
          ) : (
            <table className="requirement-table">
              <thead>
                <tr>
                  <th>Requirement Name</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequirements.length === 0 ? (
                  <tr>
                    <td colSpan="4">No requirements available</td>
                  </tr>
                ) : (
                  filteredRequirements.map((data) => (
                    <tr key={data.requirement_id}>
                      <td
                        className="requirement-name-link"
                        onClick={() => handleNavigateToDetail(data.requirement_id)}
                        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                      >
                        {data.requirement_name}
                      </td>
                      <td>{data.requirement_description}</td>
                      <td>{data.requirement_type}</td>
                      <td>
                        <button
                          onClick={() => navigate(`/UpdateRequirement/${data.requirement_id}`)}
                          className="btn btn-primary"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(data.requirement_id)}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
export default RequirementPage;
