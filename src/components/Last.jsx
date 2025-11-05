import React from 'react'

export default function Last() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        maxWidth: '1000px',
        margin: '40px auto',
        textAlign: 'left',
      }}
    >
      {/* About */}
      <div>
        <h3 style={{ color: '#84cc16', marginBottom: '10px' }}>About</h3>
        <p style={{ color: '#9ca3af', lineHeight: '1.6' }}>
          Password Entopry Tool is a free, open-source platform for testing entopy of passwords and testing vulnerability. Built with security and privacy in mind.
        </p>
      </div>

      {/* Resources */}
      <div>
        <h3 style={{ color: '#84cc16', marginBottom: '10px' }}>Resources</h3>
        <ul style={{ listStyle: 'none', padding: 0, color: '#9ca3af' }}>
          <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Vulnerability Test Documentation</a></li>
          <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Security Best Practices</a></li>
          <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Privacy Policy</a></li>
          <li><a href="#" style={{ color: '#9ca3af', textDecoration: 'none' }}>Terms of Service</a></li>
        </ul>
      </div>

      {/* Connect */}
      <div>
        <h3 style={{ color: '#84cc16', marginBottom: '10px' }}>Connect</h3>
        <p style={{ color: '#9ca3af' }}>© 2025 Password Security Tool. All rights reserved.</p>
        <p style={{ color: '#84cc16', marginTop: '10px' }}>
          Made with <span style={{ color: 'red' }}>❤</span> for secure password management<br />
          
        </p>
      </div>
    </div>
  )
}
