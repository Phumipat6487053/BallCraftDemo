const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "testcraft"
});

// Test Database Connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as ID', db.threadId);
});

// ------------------------- PROJECT ROUTES -------------------------
// Get all projects
app.get('/project', (req, res) => {
    db.query("SELECT * FROM project", (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching projects');
        } else {
            res.send(result);
        }
    });
});

// Get a project by ID
app.get('/project/:id', (req, res) => {
    const sql = "SELECT * FROM project WHERE project_id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching the project');
        } else if (result.length > 0) {
            res.send(result[0]);
        } else {
            res.status(404).send('Project not found');
        }
    });
});

// Add a new project
app.post('/project', (req, res) => {
    const sql = "INSERT INTO project (project_name, project_description, project_duration, project_member) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.project_name,
        req.body.project_description,
        req.body.project_duration,
        req.body.project_member
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error adding project" });
        }
        return res.status(200).json({ message: "Project added successfully", data });
    });
});

// Update an existing project
app.put('/project/:id', (req, res) => {
    const sql = "UPDATE project SET project_name = ?, project_description = ?, project_duration = ?, project_member = ? WHERE project_id = ?";
    const values = [
        req.body.project_name,
        req.body.project_description,
        req.body.project_duration,
        req.body.project_member,
        req.params.id
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error updating project" });
        }
        return res.status(200).json({ message: "Project updated successfully", data });
    });
});

// Delete a project
app.delete('/project/:id', (req, res) => {
    const sql = "DELETE FROM project WHERE project_id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error('Error deleting project:', err);
            return res.status(500).json({ message: "Error deleting project" });
        }
        return res.status(200).json({ message: "Project deleted successfully" });
    });
});

// ------------------------- MEMBER ROUTES -------------------------
// Get all members
app.get('/member', (req, res) => {
    const sql = 'SELECT member_name, member_role FROM member';
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching members');
        } else {
            res.json(results);
        }
    });
});

// ------------------------- REQUIREMENT ROUTES -------------------------

// Get all requirements
app.get('/requirement', (req, res) => {
    const sql = "SELECT * FROM requirement";
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error fetching requirements");
        } else {
            res.json(results);
        }
    });
});

// Get a requirement by ID
app.get('/requirement/:id', (req, res) => {
    const sql = "SELECT * FROM requirement WHERE requirement_id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error fetching the requirement");
        } else if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).send("Requirement not found");
        }
    });
});

// Add a new requirement
app.post('/requirement', (req, res) => {
    const sql = "INSERT INTO requirement (requirement_name, requirement_type, requirement_description) VALUES (?, ?, ?)";
    const values = [
        req.body.requirement_name,
        req.body.requirement_type,
        req.body.requirement_description
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error adding requirement" });
        }
        return res.status(200).json({ message: "Requirement added successfully", data });
    });
});


// Update an existing requirement
app.put('/requirement/:id', (req, res) => {
    const sql = "UPDATE requirement SET requirement_name = ?, requirement_description =? , requirement_type = ?, WHERE requirement_id = ?";
    const values = [
        req.body.requirement_name,
        req.body.requirement_type,
        req.body.requirement_description,
        req.params.id
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error updating requirement" });
        }
        return res.status(200).json({ message: "Requirement updated successfully", data });
    });
});

// Delete a requirement
app.delete('/requirement/:id', (req, res) => {
    const sql = "DELETE FROM requirement WHERE requirement_id = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Error deleting requirement" });
        }
        return res.status(200).json({ message: "Requirement deleted successfully" });
    });
});

app.get('/project/:id/requirements', (req, res) => {
    const sql = `
        SELECT 
            r.requirement_id,
            r.requirement_name,
            r.requirement_type,
            r.requirement_description,
            p.project_name
        FROM requirement r
        INNER JOIN project p ON r.project_id = p.project_id
        WHERE r.project_id = ?
    `;
    const projectId = req.params.id;

    db.query(sql, [projectId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching requirements');
        } else {
            res.json(results);
        }
    });
});
app.get('/projects-with-requirements', (req, res) => {
    const sql = `
        SELECT 
            p.project_id,
            p.project_name,
            r.requirement_id,
            r.requirement_name,
            r.requirement_type,
            r.requirement_description
        FROM project p
        LEFT JOIN requirement r ON p.project_id = r.project_id
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching projects with requirements');
        } else {
            // Group data by project
            const groupedData = results.reduce((acc, row) => {
                const { project_id, project_name, requirement_id, requirement_name, requirement_type, requirement_description } = row;

                if (!acc[project_id]) {
                    acc[project_id] = {
                        project_id,
                        project_name,
                        requirements: []
                    };
                }

                if (requirement_id) {
                    acc[project_id].requirements.push({
                        requirement_id,
                        requirement_name,
                        requirement_type,
                        requirement_description
                    });
                }

                return acc;
            }, {});

            res.json(Object.values(groupedData));
        }
    });
});





// ------------------------- SERVER LISTENER -------------------------
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
