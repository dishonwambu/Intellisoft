import React, { useState, useEffect } from 'react';
import HealthForm1 from './HealthForm1';
import HealthForm2 from './HealthForm2';

// Set initial states for date, height, weight and bmi
function VisitsPage() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState('');
  const [showHealthForm1, setShowHealthForm1] = useState(false);
  const [showHealthForm2, setShowHealthForm2] = useState(false);
  
  // useEffect hook that recalculates BMI whenever height and/or weight changes
  useEffect(() => {
    if (height && weight) {
      const calculatedBMI = (weight / (height * height)).toFixed(2);
      setBMI(calculatedBMI);
    } else {
      setBMI('');
    }
  }, [height, weight]);
  
  // handleSubmit function that sends the form data to the backend for processing
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { date, height, weight, bmi };
    fetch('/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          alert('Data saved successfully!');

          // Check BMI value and conditionally render HealthForm1 or HealthForm2 component
        if (bmi < 25) {
          // Render HealthForm1 component
          setShowHealthForm1(true);
        } else {
          // Render HealthForm2 component
          setShowHealthForm2(true);
        }

        } else {
          alert('check on server connection');
          
        }
      })
      .catch((error) => {
        alert('Error savinggggg data!');
      });
  };

  return (
    <div>
      <h1>visits</h1>
      <form onSubmit={handleSubmit}>
        <h2>Vitals Section</h2>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          max={new Date().toISOString().slice(0, 10)}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <br />
        <label>Height (in meters):</label>
        <input
          type="number"
          step="0.1"
          value={height}
          onChange={(e) => setHeight(Math.max(0, e.target.value))}
          required
        />
        <br />
        <label>Weight (in kg):</label>
        <input
          type="number"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(Math.max(0, e.target.value))}
          required
        />
        <br />
        <label>BMI:</label>
        <input type="text" value={bmi} disabled />
        <br />
        <button type="submit">Save</button>
      </form>
      {showHealthForm1 && <HealthForm1 />}
      {showHealthForm2 && <HealthForm2 />}
    </div>
  );
}

export default VisitsPage;
