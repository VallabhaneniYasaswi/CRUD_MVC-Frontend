import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const saveStudent = async () => {
    try {
      const studentData = { name, age, grade };

      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, studentData);
        setEditingId(null);
      } else {
        await axios.post(API_URL, studentData);
      }

      setName('');
      setAge('');
      setGrade('');
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const editStudent = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setAge(student.age);
    setGrade(student.grade);
  };

  return (
    <div style={{
      maxWidth: '600px',  // Increased width
      margin: '40px auto',
      padding: '40px',     // Increased padding
      backgroundColor: '#f9fafb',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      textAlign: 'center'
    }}>
      <h2 style={{
        color: '#333',
        marginBottom: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>Student List</h2>
      
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
          placeholder="Age" 
          type="number"
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
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
          placeholder="Grade" 
          value={grade} 
          onChange={(e) => setGrade(e.target.value)} 
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
          onClick={saveStudent}
        >
          {editingId ? "Update Student" : "Add Student"}
        </button>
      </div>
      
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        {students.map(student => (
          <li key={student._id} style={{
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
              {student.name} - Age: {student.age}, Grade: {student.grade}
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
                onClick={() => editStudent(student)}
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
                onClick={() => deleteStudent(student._id)}
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

export default StudentList;
