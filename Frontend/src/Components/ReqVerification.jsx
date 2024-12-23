import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faPlus, faCheckSquare, faFileUpload } from "@fortawesome/free-solid-svg-icons";

import "./CSS/ReqVerification.css";

const ReqVerification = () => {
  const [checklist, setChecklist] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch checklist and requirements data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const checklistResponse = await axios.get("/api/checklist");
        const requirementsResponse = await axios.get("/api/requirements");
        setChecklist(checklistResponse.data);
        setRequirements(requirementsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle checkbox toggle
  const handleToggleCheckbox = (index) => {
    const updatedChecklist = [...checklist];
    updatedChecklist[index].checked = !updatedChecklist[index].checked;
    setChecklist(updatedChecklist);
    // Optionally send updates to server
  };

  return (
    <div className="req-verification-container">
      <header className="req-verification-header">
        <h2>Verification Requirements</h2>
      </header>
      <main className="req-verification-content">
        {/* Checklist Section */}
        <div className="checklist-section">
          <h3>Checklist</h3>
          <ul>
            {checklist.map((item, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => handleToggleCheckbox(index)}
                />
                <span>{item.name}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Requirements Table */}
        <div className="requirements-section">
          <h3>Requirements</h3>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Requirements Statements</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {requirements.map((req) => (
                <tr key={req.id}>
                  <td>{req.id}</td>
                  <td>{req.statement}</td>
                  <td>{req.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Placeholder for future functionality */}
        <div className="future-section">
          <h3>Future Features</h3>
          <div className="placeholder-box"></div>
          <div className="placeholder-box"></div>
          <div className="placeholder-box"></div>
        </div>
      </main>
    </div>
  );
};

export default ReqVerification;
