import React, { useState, useEffect } from 'react';

function VisitsPage() {
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState('');

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
    fetch('/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.ok) {
          alert('Data saved successfully!');
        } else {
          alert(console.error(e));
          
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
    </div>
  );
}

export default VisitsPage;
