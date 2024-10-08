import React, { useState } from 'react';
import './registersupplire.css';

const RegisterSupplier = () => {
  const [supplierData, setSupplierData] = useState({
    name: '', 
    contactInfo: {
      email: '',
      phone: '',
    },
    address: '',
  });
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState(''); // State for name error message
  const [emailError, setEmailError] = useState(''); // State for email error message
  const [phoneError, setPhoneError] = useState(''); // State for phone error message

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'name') {
      // Allow only letters in the name field
      const lettersOnly = /^[A-Za-z\s]*$/;
      if (!lettersOnly.test(value)) {
        setNameError('Enter only letters.');
        return; // Disable entering invalid characters
      } else {
        setNameError(''); // Clear error message if valid
      }
    }

    if (name === 'phone') {
      // Allow only numbers in the phone field
      const numbersOnly = /^[0-9]*$/;
      if (!numbersOnly.test(value)) {
        setPhoneError('Enter only numbers.');
        return; // Disable entering invalid characters
      } else {
        setPhoneError(''); // Clear error message if valid
      }
    }

    if (name === 'email') {
      // Validate email format (basic validation)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        setEmailError('Invalid email format.');
      } else {
        setEmailError(''); // Clear error message if valid
      }
    }

    if (name === 'email' || name === 'phone') {
      setSupplierData((prevState) => ({
        ...prevState,
        contactInfo: { ...prevState.contactInfo, [name]: value },
      }));
    } else {
      setSupplierData({ ...supplierData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message || emailError || nameError || phoneError) {
      return; // Prevent form submission if there's a validation message
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/suppliers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(supplierData),
      });

      if (response.ok) {
        setMessage('Supplier registered successfully!');
        setSupplierData({
          name: '',
          contactInfo: { email: '', phone: '' },
          address: '',
        });
      } else {
        setMessage('Error registering supplier.');
      }
    } catch (error) {
      console.error('Failed to register supplier:', error);
      setMessage('Failed to register supplier.');
    }
  };

  return (
    <div className="register-supplier-container">
      <h2 className="form-title">Register Supplier</h2>
      <form className="supplier-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Supplier Name</label>
          <input
            type="text"
            name="name"
            value={supplierData.name}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          {nameError && <p className="error-message">{nameError}</p>} {/* Error message for invalid name */}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={supplierData.contactInfo.email}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          {emailError && <p className="error-message">{emailError}</p>} {/* Error message for invalid email */}
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={supplierData.contactInfo.phone}
            onChange={handleInputChange}
            required
            className="form-input"
          />
          {phoneError && <p className="error-message">{phoneError}</p>} {/* Error message for invalid phone number */}
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={supplierData.address}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button">
          Register Supplier
        </button>
      </form>
      {message && <p className="form-message">{message}</p>}
    </div>
  );
};

export default RegisterSupplier;
