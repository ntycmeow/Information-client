import React, { useState } from 'react';
import axios from 'axios';

const Form = ({ fetchUsers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { name, email, phone };
    await axios.post('http://localhost:5000/api/users', user);
    fetchUsers(); 
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="form-container">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
          required
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter Phone"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
