import React from 'react';

const TestComponent = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: '#3b82f6', marginBottom: '20px' }}>
        Skill Analysis System - Test Component
      </h1>
      <p style={{ fontSize: '18px', marginBottom: '10px' }}>
        ✅ React is working!
      </p>
      <p style={{ fontSize: '16px', color: '#666' }}>
        If you can see this, the basic React setup is working.
      </p>
      <div style={{ 
        marginTop: '20px', 
        padding: '10px', 
        border: '1px solid #ddd', 
        borderRadius: '5px',
        backgroundColor: '#f9f9f9'
      }}>
        <h3>Next Steps:</h3>
        <ol style={{ textAlign: 'left', fontSize: '14px' }}>
          <li>Check browser console for errors</li>
          <li>Verify all imports are working</li>
          <li>Test the authentication flow</li>
          <li>Check routing configuration</li>
        </ol>
      </div>
    </div>
  );
};

export default TestComponent;
