import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './CSS/UpdateRequirement.css';

const UpdateRequirement = () => {
  const { id } = useParams(); // Retrieve requirement ID from URL
  const [requirementData, setRequirementData] = useState({
    requirement_name: '',
    requirement_type: '',
    requirement_description: '',
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch existing requirement data from the API
  useEffect(() => {
    axios
      .get(`http://localhost:3001/requirement/${id}`)
      .then((res) => {
        setRequirementData({
          requirement_name: res.data.requirement_name,
          requirement_type: res.data.requirement_type,
          requirement_description: res.data.requirement_description,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching requirement data:', err);
        setLoading(false);
      });
  }, [id]);

  // Handle form submission to update the requirement
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3001/requirement/${id}`,
        requirementData
      );

      if (response.status === 200) {
        alert('Requirement updated successfully!');
        navigate(`/Dashboard?project=YourProjectName`); // Redirect to Dashboard with query string
      }
    } catch (error) {
      console.error('Error updating requirement:', error);
      alert('Failed to update requirement');
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequirementData({
      ...requirementData,
      [name]: value,
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="update-requirement"> 
      <h1>Update Requirement</h1> 
      <form className="requirement-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="requirement_name">Requirement Statement</label>
          <input
            type="text"
            id="requirement_name"
            name="requirement_name"
            value={requirementData.requirement_name} 
            onChange={handleChange}
            placeholder="Enter requirement statement"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="requirement_type">Type</label>
          <select
            id="requirement_type"
            name="requirement_type"
            value={requirementData.requirement_type}
            onChange={handleChange}
          >
            <option value="" disabled>Select Type</option>
            <option value="Functional">Functionality</option>
            <option value="User interface">User interface</option>
            <option value="External interfaces">External interfaces</option>
            <option value="Reliability">Reliability</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Portability">Portability</option>
            <option value="Limitations Design and construction">
              Limitations Design and construction
            </option>
            <option value="Interoperability">Interoperability</option>
            <option value="Non-Functional">Reusability</option>
            <option value="Non-Functional">Legal and regulative</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="requirement_description">Description</label>
          <textarea
            id="requirement_description"
            name="requirement_description"
            value={requirementData.requirement_description}
            onChange={handleChange}
            placeholder="Enter requirement description"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
          <button
            type="button"
            className="btn btn-back"
            onClick={() => navigate('/Dashboard')}
          >
            Back to Dashboard
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRequirement;
