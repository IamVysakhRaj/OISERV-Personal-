// src/PenOrderPage.js
import React from 'react';
import'../styles/OrderPage.css'
import notepad from '../assets/Images/notepad.jpg'; // Update the path as necessary

const NotepadOrderPage = () => {
  const handleSubmit = (quantity, message) => {
    alert(`Pen Order Submitted! Quantity: ${quantity}, Message: ${message}`);
  };

  return (
    <CommonStationary
      imageSrc={notepad}
      formLabel="Select Quantity:"
      options={[1, 2, 3, 4, 5]}
      onSubmit={handleSubmit}
    />
  );
};

export default NotepadOrderPage;
