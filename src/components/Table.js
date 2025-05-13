import React, { useState } from 'react';
import axios from 'axios';

const Table = ({ users, fetchUsers }) => {
  const [editingUser, setEditingUser] = useState(null);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setUserData({
      name: user.name,
      email: user.email,
      phone: user.phone
    });
  };

  const handleSave = async (id) => {
    try {
      const updatedUser = { ...userData };
      await axios.put(`http://localhost:5000/api/users/${id}`, updatedUser);
      fetchUsers();
      setEditingUser(null);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };


  return (
    <div className="table-container">
      <h2>Users List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {editingUser === user.id ? (
                  <input
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editingUser === user.id ? (
                  <input
                    type="email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUser === user.id ? (
                  <input
                    type="text"
                    value={userData.phone}
                    onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  />
                ) : (
                  user.phone
                )}
              </td>
              <td>
                {editingUser === user.id ? (
                  <button className="save" onClick={() => handleSave(user.id)}>Save</button>
                ) : (
                  <>
                    <button className="edit" onClick={() => handleEdit(user)}>Edit</button>
                    <button className="delete" onClick={() => handleDelete(user.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
