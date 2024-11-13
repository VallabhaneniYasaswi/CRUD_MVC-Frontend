// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import StudentList from './components/StudentList';
import FacultyList from './components/FacultyList';

function App() {
  const appContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  };

  const contentContainerStyle = {
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
  };

  return (
    <Router>
      <div style={appContainerStyle}>
        <Home />
        <div style={contentContainerStyle}>
          <Routes>
            <Route path="/students" element={<StudentList />} />
            <Route path="/faculty" element={<FacultyList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
