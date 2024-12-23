import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faPlus, faCheckSquare, faFileUpload } from "@fortawesome/free-solid-svg-icons";
import "./CSS/RequirementPage.css";

const RequirementPage = () => {
  const [requirementList, setRequirementList] = useState([]);
  const [selectedRequirements, setSelectedRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null); // สำหรับการอัปโหลดไฟล์
  const navigate = useNavigate();

  // Fetch requirements on initial load
  useEffect(() => {
    axios
      .get("http://localhost:3001/requirement")
      .then((res) => {
        setRequirementList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  // Handle select/deselect requirement
  const handleSelectRequirement = (id) => {
    setSelectedRequirements((prev) =>
      prev.includes(id)
        ? prev.filter((reqId) => reqId !== id)
        : [...prev, id]
    );
  };

  // Handle delete with confirmation
  const handleDelete = (requirementId) => {
    if (window.confirm("Are you sure you want to delete this requirement?")) {
      axios
        .delete(`http://localhost:3001/requirement/${requirementId}`)
        .then((response) => {
          console.log("Requirement deleted:", response.data);
          setRequirementList((prev) =>
            prev.filter((req) => req.requirement_id !== requirementId)
          );
        })
        .catch((err) => {
          console.log("Error deleting requirement:", err);
        });
    }
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadSubmit = () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post("http://localhost:3001/upload", formData)
        .then((res) => {
          console.log("File uploaded successfully:", res.data);
          setFile(null);
        })
        .catch((err) => {
          console.error("Error uploading file:", err);
        });
    } else {
      alert("Please select a file to upload.");
    }
  };

  //จัดให้ตัวหนังสือมันห่างๆกันหน่อย
  return (
    <div className="requirement-container">
      <div className="top-section">
        <h1 className="requirement-title">Requirements</h1>
        <div className="action-buttons">

        <button className="review-button"
          onClick={() => navigate("/ReviewReqVeri")}
          >
            <FontAwesomeIcon icon={faCheckSquare} /> Review Verification
          </button>

          <button className="verify-button"
          onClick={() => navigate("/ReqVerification")}
          >
            <FontAwesomeIcon icon={faCheckSquare} /> Verification
          </button>
          
          <button
            onClick={() => navigate("/CreateRequirement")}
            className="add-requirement-button"
          >
            <FontAwesomeIcon icon={faPlus} /> Add Requirements
          </button>
        </div>
      </div>

      <div className="content-container">
        {loading ? (
          <p>Loading requirements...</p>
        ) : (
          <table className="requirement-table">
            <thead>
              <tr>
                <th>Select</th>
                <th>ID</th>
                <th>Description</th>
                <th>Type</th>
                <th>Actions</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requirementList.length === 0 ? (
                <tr>
                  <td colSpan="6">No requirements available</td>
                </tr>
              ) : (
                requirementList.map((data) => (
                  <tr key={data.requirement_id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRequirements.includes(
                          data.requirement_id
                        )}
                        onChange={() =>
                          handleSelectRequirement(data.requirement_id)
                        }
                      />
                    </td>
                    <td>{data.requirement_id}</td>
                    <td>{data.requirement_description}</td>
                    <td>{data.requirement_type}</td>
                    <td>
                      <button
                        onClick={() =>
                          navigate(`/UpdateRequirement/${data.requirement_id}`)
                        }
                        className="edit-req"
                      >
                        <FontAwesomeIcon icon={faPen} className="edit-icon" />
                      </button>
                      <button
                        onClick={() => handleDelete(data.requirement_id)}
                        className="delete-req"
                      >
                        <FontAwesomeIcon icon={faTrash} className="trash-icon" />
                      </button>
                    </td>
                    
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* File Upload Section */}
      <div className="file-upload-section">
        <h3>File</h3>
        <div className="file-upload-container">
          <input type="file" onChange={handleFileUpload} className="file-input" />
          <button onClick={handleUploadSubmit} className="upload-button">
            <FontAwesomeIcon icon={faFileUpload} /> Add File
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequirementPage;
