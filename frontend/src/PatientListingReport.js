import React, { useState, useEffect } from "react";
import axios from "axios";

function PatientListingReport() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    // Format selected date to yyyy-mm-dd
    const formattedDate = selectedDate.toISOString().slice(0, 10);

    // Fetch patients data from API endpoint
    axios
      .get(`http://localhost:3001/patients?date=${formattedDate}`)
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedDate]);

  console.log(selectedDate);
  console.log(patients);

  function calculateAge(dateOfBirth) {
    if (!dateOfBirth) return "failled to get dob"; // return empty string if date of birth is null/undefined
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  return (
    <div>
      <h1>Patient Report</h1>
      <label htmlFor="date-picker">Select Date:</label>
      <input
        type="date"
        id="date-picker"
        value={selectedDate.toISOString().slice(0, 10)}
        onChange={(event) =>
          setSelectedDate(new Date(event.target.value))
        }
      />

      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Age</th>
            <th>BMI Status</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{`${patient.first_name} ${patient.last_name}`}</td>
              <td>{calculateAge(patient.dob)}</td>
              <td>
                {patient.bmi < 18.5
                  ? "Underweight"
                  : patient.bmi >= 18.5 && patient.bmi < 25
                  ? "Normal"
                  : "Overweight"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientListingReport;
