import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import './CSS/Project.css';

const Project = () => {
  const [projectlist, setProjectList] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    axios
      .get('http://localhost:3001/project') //ดึงข้อมูลจาก
      .then((res) => {
        setProjectList(res.data);
        setFilteredProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredProjects(projectlist);
    } else {
      setFilteredProjects(
        projectlist.filter((project) =>
          project.project_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, projectlist]);

  const calculateDaysRemaining = (endDate) => { //แสดงวันที่ตอน update มีเงื่ยนไข Days และ Expired
    const currentDate = new Date();
    const end = new Date(endDate);
    const diffTime = end - currentDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} Days` : 'Expired';
  };

  const handleUpdateProject = (id) => {
    navigate(`/UpdateProject/${id}`);
  };

  const handleDeleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/project/${id}`); 
      fetchProjects();
    } catch (err) {
      console.log(err);
    }
  };

  const handleProjectClick = (name) => {
    navigate(`/Dashboard?project=${encodeURIComponent(name)}`);
  };

  return (
    <div className="topic-project">
      <div className="top-section">
        <h1 className="project-title">Project Information</h1>
        <button onClick={() => navigate('/CreateProject')} className="create-project-btn">
          Create Project
        </button>
      </div>

      <div className="content-container">
        <div className="project-section">
          <div className="project-search">
            <input
              type="text"
              className="project-search-input"
              placeholder="Search Project"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          </div>

          {loading ? (
            <p>Loading projects...</p> 
          ) : (
            <table className="project-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Remaining day</th>
                  <th>Action</th>
                </tr>
              </thead>
                <tbody>
                  {filteredProjects.length === 0 ? (
                    <tr>
                      <td colSpan="6">No projects available</td>
                    </tr>
                  ) : (
                    filteredProjects.map((data) => (
                      //มีคลิกที่โปรเจคจะมีชื่อของโปรเจคนั้นอยู่ที่หน้า dashboard
                      //แสดงวันที่เป็นรูปแบบ วัน/เดือน/ปี ของ start_date และ end_date
                      <tr key={data.project_id} onClick={() => handleProjectClick(data.project_name)}>
                        <td className="project-name-link">{data.project_name}</td>
                        <td>{data.project_description}</td>
                        <td>{new Date(data.start_date).toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                        <td>{new Date(data.end_date).toLocaleDateString('th-TH', { day: '2-digit', month: '2-digit', year: 'numeric' })}</td>
                        <td>{calculateDaysRemaining(data.end_date)}</td>
                        <td>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpdateProject(data.project_id);
                            }}
                            className="editproject-button"
                          >
                            <FontAwesomeIcon icon={faPenToSquare} className="edit-icon" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteProject(data.project_id);
                            }}
                            className="deleteproject-button"
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
      </div>
    </div>
  );
};

export default Project;
