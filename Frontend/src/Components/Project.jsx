import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import './CSS/Project.css'

const Project = () => {
    const [members, setMembers] = useState([]);
    const [formProject, setFormProject] = useState({
        project_name: '',
        project_description: '',
        project_duration: '',
        project_member: []
    });
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

    const handleChange = (selectedOptions) => {
        setFormProject({
            ...formProject,
            project_member: selectedOptions ? selectedOptions.map(option => option.value) : []
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formProject.project_name.trim()) {
            alert("Project Name is required");
            return;
        }

        axios.post('http://localhost:3001/project', {
            ...formProject,
            project_member: JSON.stringify(formProject.project_member) // เปลี่ยนเป็นเเบบ JSON
        })
            .then(() => {
                alert('Project created successfully!');
                navigate('/projects');
            })
            .catch(err => {
                console.error(err);
                alert('Failed to create project');
            });
    };

    return (
        <div className="create-project">
            <h2>Create New Project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Project Name:
                    <input
                        type="text"
                        name="project_name"
                        value={formProject.project_name}
                        onChange={(e) =>
                            setFormProject({ ...formProject, project_name: e.target.value })
                        }
                    />
                </label>
                <label>
                    Project Description:
                    <input
                        type="text"
                        name="project_description"
                        value={formProject.project_description}
                        onChange={(e) =>
                            setFormProject({ ...formProject, project_description: e.target.value })
                        }
                    />
                </label>
                <label>
                    Project Duration:
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="text"
                            name="project_duration"
                            value={formProject.project_duration}
                            onChange={(e) =>
                                setFormProject({ ...formProject, project_duration: e.target.value })
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
                    value={members.filter(member => formProject.project_member.includes(member.value))}
                />

                <button type="submit">Create Project</button>
            </form>
        </div>
    );
};

export default Project;
