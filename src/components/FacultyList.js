// src/components/FacultyList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FacultyList() {
  const [faculty, setFaculty] = useState([]);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [experience, setExperience] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URLF;

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get(API_URL);
      setFaculty(response.data);
    } catch (error) {
      console.error("Error fetching faculty:", error);
    }
  };

  const saveFaculty = async () => {
    try {
      const facultyData = { name, department, experience };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, facultyData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, facultyData);
      }

      setName('');
      setDepartment('');
      setExperience('');
      fetchFaculty();
    } catch (error) {
      console.error("Error saving faculty:", error);
    }
  };

  const deleteFaculty = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchFaculty();
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const editFaculty = (faculty) => {
    setEditingId(faculty._id);
    setName(faculty.name);
    setDepartment(faculty.department);
    setExperience(faculty.experience);
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      padding: '40px',
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
    }}>
      <h2 style={{
        color: '#333',
        marginBottom: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>Faculty List</h2>
      
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <input 
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '12px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '15px'
          }}
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        
        <input 
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '12px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '15px'
          }}
          placeholder="Department" 
          value={department} 
          onChange={(e) => setDepartment(e.target.value)} 
        />
        
        <input 
          style={{
            width: '100%',
            padding: '12px',
            marginBottom: '12px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '15px'
          }}
          placeholder="Experience (years)" 
          type="number"
          value={experience} 
          onChange={(e) => setExperience(e.target.value)} 
        />
        
        <button 
          style={{
            width: '100%',
            padding: '12px',
            color: '#fff',
            backgroundColor: editingId ? '#f48fb1' : '#7e57c2',
            border: 'none',
            borderRadius: '6px',
            fontSize: '15px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
            marginBottom: '20px'
          }}
          onClick={saveFaculty}
        >
          {editingId ? "Update Faculty" : "Add Faculty"}
        </button>
      </div>
      
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {faculty.map(fac => (
          <li key={fac._id} style={{
            padding: '10px',
            margin: '8px 0',
            backgroundColor: '#ffffff',
            border: '1px solid #ddd',
            borderRadius: '6px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '15px', fontWeight: '500' }}>
              {fac.name} - Department: {fac.department}, Experience: {fac.experience} years
            </span>
            
            <div>
              <button 
                style={{
                  padding: '5px 10px',
                  marginRight: '5px',
                  color: '#fff',
                  backgroundColor: '#689f38',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onClick={() => editFaculty(fac)}
              >
                Edit
              </button>
              
              <button 
                style={{
                  padding: '5px 10px',
                  color: '#fff',
                  backgroundColor: '#e57373',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
                onClick={() => deleteFaculty(fac._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FacultyList;
