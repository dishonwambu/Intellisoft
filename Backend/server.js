const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

// create a new express app
const app = express();

// enable cross-origin resource sharing
app.use(cors());

// create a connection to the MySQL database
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "", // MySQL password
  database: "intellisoft",
  connectionLimit: 10, // maximum number of connections in the pool
});

// configure body parser middleware to parse incoming JSON data
app.use(bodyParser.json());

// define the route to handle patient registration
app.post("/patients", (req, res) => {
  // extract patient data from the request body
  const { firstName, lastName, dob, gender } = req.body;

  // validate required fields
  if (!firstName || !lastName || !dob || !gender) {
    return res.status(400).send({ message: "Missing required fields" });
  }

  // define the SQL query to insert the patient data into the database
  const sql = `
    INSERT INTO patients (first_name, last_name, dob, gender)
    VALUES (?, ?, ?, ?)
  `;

  // execute the SQL query with the patient data
  pool.query(sql, [firstName, lastName, dob, gender], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: "Internal server error" });
    }

    // return the newly inserted patient data
    const patientId = result.insertId;
    const patient = { id: patientId, firstName, lastName, dob, gender };
    res.status(201).send(patient);
  });
});

// define a route that returns a simple message when a GET request is made to the root URL "/"
app.get("/", (req, res) => {
  res.send("Welcome to the Intellisoft patient registration system");
});

// start the server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
