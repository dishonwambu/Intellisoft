// Import necessary modules
const express = require('express'); // Web framework for Node.js
const mysql = require('mysql'); // MySQL driver for Node.js
const cors = require('cors'); // Cross-origin resource sharing middleware for Express
//const { default: VisitsPage } = require('../frontend/src/VisitsPage');

// Create an instance of the Express web framework
const app = express();

// Create a MySQL database connection
const connection = mysql.createConnection({
  host: 'localhost', // Database host
  user: 'root', // Database username
  password: '', // Database password
  database: 'intellisoft' // Database name
});

// Enable cross-origin requests
app.use(cors());

// Enable parsing of JSON request bodies
app.use(express.json());

// Define a route to handle POST requests to '/visits'
app.post('/visits', (req, res) => {
  // Extract the necessary data from the request body
  const { date, height, weight, bmi } = req.body;

  // Construct the MySQL query to insert the data into the 'visits' table
  const query = `INSERT INTO visits (date, height, weight, bmi) VALUES ('${date}', ${height}, ${weight}, ${bmi})`;

  // Execute the MySQL query and handle any errors
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } else {
      res.status(200).send('Data inserted successfully');
    }
  });
});

// Start the server and listen for incoming requests on the specified port
// Define the port the server should listen on
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
