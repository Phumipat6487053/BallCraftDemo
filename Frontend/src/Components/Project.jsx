import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import logo from '../image/testcraft-logo.png';

import './CSS/Project.css';

const Project = () => {
    const [projectlist, setProjectList] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get('http://localhost:3001/project')
            .then((res) => {
                setProjectList(res.data);
                setFilteredProjects(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredProjects(projectlist); // Show all projects if search query is empty
        } else {
            setFilteredProjects(
                projectlist.filter((project) =>
                    project.project_name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }
    }, [searchQuery, projectlist]);

    const handleUpdateProject = (id) => {
        navigate(`/UpdateProject/${id}`);
    };

    const handleDeleteProject = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/project/${id}`);
            setProjectList(projectlist.filter((project) => project.project_id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    const handleNavigateToDashboard = (projectName) => {
        navigate(`/Dashboard?project=${projectName}`);
    };

    return (
        <div className="topic-project">
            <div className="top-section">
                <h1 className="project-title">Project</h1>
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
                                    <th>Duration</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjects.length === 0 ? (
                                    <tr>
                                        <td colSpan="4">No projects available</td>
                                    </tr>
                                ) : (
                                    filteredProjects.map((data) => (
                                        <tr key={data.project_id}>
                                            <td
                                                className="project-name-link"
                                                onClick={() => handleNavigateToDashboard(data.project_name)}
                                                style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
                                            >
                                                {data.project_name}
                                            </td>
                                            <td>{data.project_description}</td>
                                            <td>{data.project_duration} Days</td>
                                            <td>
                                                <button
                                                    onClick={() => handleUpdateProject(data.project_id)}
                                                    className="btn btn-primary"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteProject(data.project_id)}
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

                <div className="topic-project">
                    <div className="promo-banner">
                        <img src={logo} alt="TestCraft Logo" className="promo-image" />
                        <div className="promo-content">
                            <h2>Welcome to TestCraft</h2>
                            <p>Your all-in-one project management and testing tool, ISO/IEC 29110 compliant.</p>
                            <p>
                                Streamline project, requirement, design, and test case management with seamless
                                traceability and collaboration.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Project;
