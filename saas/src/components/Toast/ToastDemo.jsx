import React from 'react';
import { useToast } from './ToastContainer';

const ToastDemo = () => {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const handleSuccess = () => {
    showSuccess('Operation completed successfully!', 4000);
  };

  const handleError = () => {
    showError('Something went wrong. Please try again.', 5000);
  };

  const handleWarning = () => {
    showWarning('Please check your input before proceeding.', 4000);
  };

  const handleInfo = () => {
    showInfo('Here is some useful information for you.', 3000);
  };

  return (
    <div style={{ padding: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      <button 
        onClick={handleSuccess}
        style={{
          padding: '10px 20px',
          backgroundColor: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontFamily: 'Poppins, sans-serif'
        }}
      >
        Show Success Toast
      </button>
      
      <button 
        onClick={handleError}
        style={{
          padding: '10px 20px',
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontFamily: 'Poppins, sans-serif'
        }}
      >
        Show Error Toast
      </button>
      
      <button 
        onClick={handleWarning}
        style={{
          padding: '10px 20px',
          backgroundColor: '#f59e0b',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontFamily: 'Poppins, sans-serif'
        }}
      >
        Show Warning Toast
      </button>
      
      <button 
        onClick={handleInfo}
        style={{
          padding: '10px 20px',
          backgroundColor: 'var(--primary)',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontFamily: 'Poppins, sans-serif'
        }}
      >
        Show Info Toast
      </button>
    </div>
  );
};

export default ToastDemo; 