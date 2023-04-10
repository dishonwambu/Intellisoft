import React, { useState } from "react";

import { useHistory } from 'react-router-dom';



function Registration() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

  const currentDate = new Date().toISOString().slice(0, 10);

  const history = useHistory();
  const handleSubmit = async (event) => {
  event.preventDefault();
  
  // Send form data to backend service
  try {
    const response = await fetch('/patients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // method is used to convert the patient object to a JSON string before sending it.
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        dob: dob,
        gender: gender
      })
      
    });

    if (!response.ok) {
      throw new Error('An error occurred while submitting the form.');
    }

    const data = await response.json();
    console.log(data);
    alert("Patient successfuly Added"); // show success message
    setFirstName("");
    setLastName("");
    setDob("");
    setGender("");
    history.push('/visits'); // redirect to Visits Page component

  } catch (error) {
    console.error(error);
    alert('An error occurred. Please try again.');
  }
};

  const handleClear = () => {
    setFirstName("");
    setLastName("");
    setDob("");
    setGender("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Registration Page</h1>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Date of Birth:
          <input
            type="date"
            value={dob}
            max={currentDate}
            onChange={(event) => setDob(event.target.value)}
          />
        </label>
        <br />
        <label>
          Gender:
          <select
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          >
            <option value="">-- Select Gender --</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <br />

        <button type="submit" id="submit-button">
          Submit
        </button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
        
        
      </form>
    </div>
  );
}

export default Registration;
