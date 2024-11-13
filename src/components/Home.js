// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const homeStyle = {
    width: '100%',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #ddd',
  };

  const navBarStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f06292',
    padding: '10px 20px',
    borderRadius: '8px',
    gap: '20px', // Added gap to separate title and links
  };

  const titleStyle = {
    color: 'white',
    fontSize: '24px',
    fontWeight: 'bold',
    textDecoration: 'none',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  };

  const linkHoverStyle = {
    backgroundColor: '#ad1457',
  };

  return (
    <div style={homeStyle}>
      <nav style={navBarStyle}>
        <Link to="/" style={titleStyle}>Management System</Link>
        <Link
          to="/students"
          style={linkStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          Student
        </Link>
        <Link
          to="/faculty"
          style={linkStyle}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = linkHoverStyle.backgroundColor)}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          Faculty
        </Link>
      </nav>
    </div>
  );
}

export default Home;
