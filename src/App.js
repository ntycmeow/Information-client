import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Form from './components/Form';
import Table from './components/Table';

function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:3000/api/users');
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <h1>User Management</h1>
      <Form fetchUsers={fetchUsers} />
      <Table users={users} />
    </div>
  );
}

export default App;
