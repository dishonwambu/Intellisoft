import React, { useState, useEffect } from 'react';
import HealthForm1 from './HealthForm1';
import HealthForm2 from './HealthForm2';

function VisitsPage() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState('');
  const [showHealthForm1, setShowHealthForm1] = useState(false);
  const [showHealthForm2, setShowHealthForm2] = useState(false);

  useEffect(() => {
    if (height && weight) {
      const calculatedBMI = (weight / (height * height)).toFixed(2);
      setBMI(calculatedBMI);
    } else {
      setBMI('');
    }
  }, [height, weight]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { date, height, weight, bmi };
    fetch('http://localhost:3001/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          alert('Data saved successfully!');
          if (bmi < 25) {
            setShowHealthForm1(true);
          } else {
            setShowHealthForm2(true);
          }
        } else {
          alert('Error saving data!');
        }
      })
      .catch((error) => {
        alert('Error saving data!');
      });
  };

  return (
    <div>
      {!showHealthForm1 && !showHealthForm2 && (
        <form onSubmit={handleSubmit}>
          <h1>Visits</h1>
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
      )}
      {showHealthForm1 && <HealthForm1 />}
      {showHealthForm2 && <HealthForm2 />}
    </div>
  );
}

export default VisitsPage;
