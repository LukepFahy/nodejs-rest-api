const mysql = require('mysql2');
const express = require('express');
const http = require('http');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let connection = mysql.createConnection({
    host: 'localhost',
    port:3306,
    user: 'root',
    password: '',
    database: 'erdb',
    multipleStatements: true
});
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  console.log('Connected to the ERDB MySQL server.');
});

// GET request 
app.get('/students', (req, res) => {
  const sql = 'SELECT * FROM student';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// GET request per ID
app.get('/students/:id', (req, res) => {
  const sql = 'SELECT * FROM Student WHERE StudentID = ?';
  const id = req.params.id;
  connection.query(sql, [id], (err, results) => {
    if (err) throw err;
    res.send(results[0]);
  });
});

// POST request 
app.post('/students', (req, res) => {
  const { FirstName, LastName } = req.body;
  const sql = 'INSERT INTO Student (FirstName, LastName) VALUES (?, ?)';
  connection.query(sql, [FirstName, LastName], (err, result) => {
    if (err) throw err;
    res.send('Student added successfully.');
  });
});

// PUT request 
app.put('/students/:id', (req, res) => {
  const { FirstName, LastName } = req.body;
  const sql = 'UPDATE Student SET FirstName = ?, LastName = ? WHERE StudentID = ?';
  const id = req.params.id;
  connection.query(sql, [FirstName, LastName, id], (err, result) => {
    if (err) throw err;
    res.send('Student updated successfully.');
  });
});

// DELETE request
app.delete('/students/:id', (req, res) => {
  const sql = 'DELETE FROM Student WHERE StudentID = ?';
  const id = req.params.id;
  connection.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send('Student deleted successfully.');
  });
});



app.listen(3000, () => console.log('Listening on port 3000'));
