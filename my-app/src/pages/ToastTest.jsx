import React from 'react';
import ToastDemo from '../components/Toast/ToastDemo';

const ToastTest = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '20px',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: 'var(--primary)',
          marginBottom: '30px'
        }}>
          Toast Notification System Demo
        </h1>
        
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>
            Test Different Toast Types
          </h3>
          <ToastDemo />
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          marginBottom: '20px'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>
            How to Use
          </h3>
          <div style={{ lineHeight: '1.6', color: '#666' }}>
            <p><strong>1.</strong> Import the useToast hook in your component:</p>
            <pre style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '15px', 
              borderRadius: '5px',
              overflow: 'auto',
              fontSize: '14px'
            }}>
{`import { useToast } from '../components/Toast/ToastContainer';`}
            </pre>
            
            <p><strong>2.</strong> Use the toast functions:</p>
            <pre style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '15px', 
              borderRadius: '5px',
              overflow: 'auto',
              fontSize: '14px'
            }}>
{`const { showSuccess, showError, showWarning, showInfo } = useToast();

// Examples:
showSuccess('Operation completed!');
showError('Something went wrong');
showWarning('Please check your input');
showInfo('Here is some information');`}
            </pre>
            
            <p><strong>3.</strong> The toast system is already integrated in your App.jsx and dashboard.jsx files.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToastTest; 