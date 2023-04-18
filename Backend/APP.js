const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

// create a new express app
const app = express();

// enable cross-origin resource sharing
app.use(cors());
// Enable parsing of JSON request bodies
app.use(express.json());

// create a connection to the MySQL database
const Connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // MySQL password
  database: "intellisoft",
  connectionLimit: 10, // maximum number of connections in the Connection
});
// Connect to database
Connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
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
  Connection.query(sql, [firstName, lastName, dob, gender], (err, result) => {
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

// Define a route to handle POST requests to '/visits'
app.post('/visits', (req, res) => {
  // Extract the necessary data from the request body
  const { date, height, weight, bmi } = req.body;

  // Construct the MySQL query to insert the data into the 'visits' table
  const query = `INSERT INTO visits (date, height, weight, bmi) VALUES ('${date}', ${height}, ${weight}, ${bmi})`;

  // Execute the MySQL query and handle any errors
  Connection.query(query, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } else {
      res.status(200).send('Data inserted successfully');
    }
  });
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

  Connection.query(query, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});


module.exports =app;