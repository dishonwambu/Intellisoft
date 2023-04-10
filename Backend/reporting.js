const express = require("express");
const mysql = require("mysql");
const app = express();

// Create database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "intellisoft",
});

// Connect to database
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

// Define API endpoint to retrieve patients data
app.get("/patients", (req, res) => {
  const date = req.query.date;

  const query = `
    SELECT 
      r.id, 
      r.first_name, 
      r.last_name, 
      r.dob, 
      v.bmi 
    FROM 
      patients r 
      JOIN visits v ON r.id = v.id 
    WHERE 
      v.date = '${date}'
  `;

  db.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
