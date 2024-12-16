import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './CSS/Project.css';

const Project = () => {
    const [projectlist, setProjectList] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/project')
            .then(res => {
                setProjectList(res.data);
                setFilteredProjects(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (searchQuery === '') {
            setFilteredProjects(projectlist);  // ถ้าไม่ได้ค้นหาให้แสดง projectทั้งหมด
        } else {
            setFilteredProjects(
                projectlist.filter(project =>
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
            setProjectList(projectlist.filter(project => project.project_id !== id));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='topic-project'>
            <div className='top-section'>
                <h1 className='project-title'>Project</h1>
                <button onClick={() => navigate('/CreateProject')} className='create-project-btn'>Create Project</button>
            </div>
            <div className='project-search'>
                <input
                    type='text'
                    className='project-search-input'
                    placeholder='Search Project'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' />
            </div>

            {loading ? (
                <p>Loading projects...</p>
            ) : (
                <table className='project-table'>
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
                                    <td>{data.project_name}</td>
                                    <td>{data.project_description}</td>
                                    <td>{data.project_duration} Days</td>
                                    <td>
                                        <button
                                            onClick={() => handleUpdateProject(data.project_id)}
                                            className='btn btn-primary'
                                        >
                                            Update
                                        </button>
                                        <button onClick={() => handleDeleteProject(data.project_id)} className='btn btn-danger'>
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
    );
};

export default Project;
