import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';

const UpdateProject = () => {
    const { id } = useParams();
    const [members, setMembers] = useState([]);
    const [formEditProject, setFormEditProject] = useState({
        project_name: '',
        project_description: '',
        project_duration: '',
        project_member: []
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/member')
            .then(res => {
                const memberOptions = res.data.map(member => ({
                    value: member.member_name,
                    label: `${member.member_name} (${member.member_role})`
                }));
                setMembers(memberOptions);
            })
            .catch(err => console.log(err));
    }, []);


    useEffect(() => {
        axios.get(`http://localhost:3001/project/${id}`)
            .then(res => {
                const projectData = res.data;
                setFormEditProject({
                    project_name: projectData.project_name,
                    project_description: projectData.project_description,
                    project_duration: projectData.project_duration,
                    project_member: JSON.parse(projectData.project_member) || []
                });
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (selectedOptions) => {
        setFormEditProject({
            ...formEditProject,
            project_member: selectedOptions ? selectedOptions.map(option => option.value) : []
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formEditProject.project_name.trim()) {
            alert("Project Name is required");
            return;
        }

        axios.put(`http://localhost:3001/project/${id}`, {
            ...formEditProject,
            project_member: JSON.stringify(formEditProject.project_member)
        })
            .then(() => {
                alert('Project updated successfully!');
                navigate('/projects');
            })
            .catch(err => {
                console.error(err);
                alert('Failed to update project');
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="update-project">
            <h2>Update Project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Project Name:
                    <input
                        type="text"
                        name="project_name"
                        value={formEditProject.project_name}
                        onChange={(e) =>
                            setFormEditProject({ ...formEditProject, project_name: e.target.value })
                        }
                    />
                </label>
                <label>
                    Project Description:
                    <input
                        type="text"
                        name="project_description"
                        value={formEditProject.project_description}
                        onChange={(e) =>
                            setFormEditProject({ ...formEditProject, project_description: e.target.value })
                        }
                    />
                </label>
                <label>
                    Project Duration:
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="text"
                            name="project_duration"
                            value={formEditProject.project_duration}
                            onChange={(e) =>
                                setFormEditProject({ ...formEditProject, project_duration: e.target.value })
                            }
                            style={{ flex: '1' }}
                        />
                        <span style={{ marginLeft: '8px' }}>Days</span>
                    </div>
                </label>
                <label>Select Members:</label>
                <Select
                    isMulti
                    name="project_member"
                    options={members}
                    className="select-members"
                    classNamePrefix="select"
                    onChange={handleChange}
                    value={members.filter(member => formEditProject.project_member.includes(member.value))}
                />
                <button type="submit">Update Project</button>
            </form>
        </div>
    );
};

export default UpdateProject;
