import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/UpdateRequirement.css';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateRequirement = () => {
  const [requirementStatement, setRequirementStatement] = useState('');
  const [requirementType, setRequirementType] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(window.location.search);
  const projectId = queryParams.get('project_id'); // รับค่า project_id จาก query params

  // ดึงข้อมูล requirement ที่จะอัปเดตจาก backend
  useEffect(() => {
    axios
      .get(`http://localhost:3001/requirement/${projectId}`)
      .then((res) => {
        setRequirementStatement(res.data.requirement_name);
        setRequirementType(res.data.requirement_type);
        setDescription(res.data.requirement_description);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching requirement data:', err);
        setError('Failed to fetch requirement data');
        setLoading(false);
      });
  }, [projectId]);

  // การส่งข้อมูลไปที่ backend เพื่ออัปเดต requirement
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedRequirement = {
      requirement_name: requirementStatement,
      requirement_type: requirementType,
      requirement_description: description,
      project_id: projectId, // ส่ง projectId ไปด้วย
    };

    try {
      const response = await axios.put(`http://localhost:3001/requirement/${projectId}`, updatedRequirement);

      if (response.status === 200) {
        alert('Requirement updated successfully');
        navigate(`/Dashboard?project_id=${projectId}`, {
          state: { selectedSection: 'Requirement' }, // เลือก section Requirement
        });
      } else {
        console.error("Failed to update requirement:", response);
        alert('Failed to update requirement');
      }
    } catch (error) {
      console.error('Error updating requirement:', error);
      if (error.response) {
        setError(error.response.data.message || 'Something went wrong');
      } else {
        setError('Network error. Please try again.');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="requirement-specification">
      <h1>Update Requirement</h1>
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
            required
          >
            <option value="" disabled>Select Type</option>
            <option value="Functional">Functionality</option>
            <option value="User interface">User interface</option>
            <option value="External interfaces">External interfaces</option>
            <option value="Reliability">Reliability</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Portability">Portability</option>
            <option value="Limitations Design and construction">Limitations Design and construction</option>
            <option value="Interoperability">Interoperability</option>
            <option value="Reusability">Reusability</option>
            <option value="Legal and regulative">Legal and regulative</option>
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
          <button
            type="button"
            className="btn btn-back"
            onClick={() => navigate(`/Dashboard?project_id=${projectId}`, { state: { selectedSection: 'Requirement' } })}
          >
            Back to Requirements
          </button>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRequirement;
