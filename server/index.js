const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "testcraft"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as ID', db.threadId);
});

app.get('/createproject', (req, res) => {
    db.query("SELECT * FROM createproject", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error executing query');
        } else {
            res.send(result);
        }
    });
});

app.get('/createproject/:id', (req, res) => {
    const sql = "SELECT * FROM createproject WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error executing query');
        } else if (result.length > 0) {
            res.send(result[0]);
        } else {
            res.status(404).send('Test Plan not found');
        }
    });
});

app.post('/createproject', (req, res) => {
    const sql = "INSERT INTO createproject (name, description) VALUES (?, ?)";
    const values = [
        req.body.name,
        req.body.description
    ];
    db.query(sql, values, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json("Error");
        }
        return res.status(200).json(data);
    });
});
app.put('/createproject/:id', (req, res) => {
    const sql = "UPDATE createproject SET name = ?, description = ? WHERE ID = ?";
    const values = [
        req.body.name,
        req.body.description,
        req.params.id
    ];

    db.query(sql, values, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Error updating data" });
        }
        return res.status(200).json(data);
    });
});

app.delete('/createproject/:id', (req, res) => {
    const sql = "DELETE FROM createproject WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.log('Error deleting the Test Plan:', err);
            return res.status(500).json({ message: "Error deleting the Test Plan" });
        }
        return res.status(200).json({ message: "Test Plan deleted successfully" });
    });
});


// app.put('/createproject/:id', (req, res) => {
//     const sql = "UPDATE createproject SET name = ?, description = ? WHERE ID = ?";
//     const values = [
//         req.body.name,
//         req.body.description,
//         req.params.id
//     ];


//     db.query(sql, values, (err, data) => {
//         if (err) {
//             console.log('Error executing query:', err);
//             return res.status(500).json({ message: "Error updating data" });
//         }
//         return res.status(200).json(data);
//     });
// });

app.get('/requirementlist', (req, res) => {
    db.query("SELECT * FROM requirementlist", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error executing query');
        } else {
            res.send(result);
        }
    });
});

app.get('/designdiagram', (req, res) => {
    db.query("SELECT * FROM designdiagram", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error executing query');
        } else {
            res.send(result);
        }
    });
});

app.get('/designWithRequirement', (req, res) => {
    const sql = `
    SELECT designdiagram.de_id, designdiagram.de_image, requirement.reqName, designdiagram.req_id 
    FROM designdiagram
    JOIN requirementlist ON designdiagram.req_id = requirementlist.req_id
  `;

    db.query(sql, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error fetching designs');
        } else {
            res.send(result);
        }
    });
});

app.get('/project', (req, res) => {
    db.query("SELECT * FROM project", (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error executing query');
        } else {
            res.send(result);
        }
    });
});
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
            console.log(err);
            return res.status(500).json("Error");
        }
        return res.status(200).json(data);
    });
});

app.get('/member', (req, res) => {
    const sql = 'SELECT member_name,member_role FROM member';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});


app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
