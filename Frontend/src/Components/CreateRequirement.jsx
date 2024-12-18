import React, { useState } from 'react';
import axios from 'axios';
import './CSS/CreateRequirement.css';
import { useNavigate } from 'react-router-dom';

const CreateRequirement = () => {
  const [requirementStatement, setRequirementStatement] = useState('');
  const [requirementType, setRequirementType] = useState('Functional');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRequirement = {
      requirement_name: requirementStatement,
      type: requirementType,
      description,
    };

    try {
      const response = await axios.post('http://localhost:3001/requirement', newRequirement);

      if (response.status === 200) {
        alert('Requirement created successfully');
        navigate(`/Dashboard?project=YourProjectName`); // Redirect to Dashboard with query string
      }
    } catch (error) {
      console.error('Error creating requirement:', error);
      alert('Error creating requirement');
    }
  };

  return (
    <div className="requirement-specification">
      <h1>Create New Requirement</h1>
      <form className="requirement-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="requirementStatement">Requirement Statement</label>
          <input
            type="text"
            id="requirementStatement"
            value={requirementStatement}
            onChange={(e) => setRequirementStatement(e.target.value)}
            placeholder="Enter requirement statement"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="requirementType">Type</label>
          <select
            id="requirementType"
            value={requirementType}
            onChange={(e) => setRequirementType(e.target.value)}
          >
            <option value="Functional">Functional</option>
            <option value="Non-Functional">Non-Functional</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter requirement description"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            Create
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

export default CreateRequirement;
