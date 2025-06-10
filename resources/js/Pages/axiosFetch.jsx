import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';

const axiosFetch = () => {
  const [joke, setJoke] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchTrigger, setFetchTrigger] = useState(0);

  const fetchJoke = async () => {
    setLoading(true);
    setJoke(null); // Reset joke to empty when new request starts
    
    try {
      // Using CORS proxy
      const proxyUrl = 'https://api.allorigins.win/get?url=';
      const targetUrl = 'https://official-joke-api.appspot.com/random_joke';
      
      const res = await axios.get(`${proxyUrl}${encodeURIComponent(targetUrl)}`);
      const jokeData = JSON.parse(res.data.contents);
      setJoke(jokeData);
    } catch (error) {
      console.error('Error fetching joke:', error);
      setJoke({ 
        setup: 'Error', 
        punchline: error.message,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch joke on component mount and when fetchTrigger changes
  useEffect(() => {
    fetchJoke();
  }, [fetchTrigger]);

  // Function to trigger a new fetch
  const handleFetchNewJoke = () => {
    setFetchTrigger(prev => prev + 1);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Navbar />
      <h2>Dynamic API Fetch (Q6)</h2>
      <button
        onClick={handleFetchNewJoke}
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? 'Loading...' : 'Fetch New Joke'}
      </button>

      {/* Card Container - Always visible */}
      <div
        style={{
          minHeight: '200px',
          border: '2px solid #ddd',
          borderRadius: '12px',
          padding: '20px',
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {loading ? (
          // Loading state
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #4CAF50',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 15px'
              }}
            />
            <p style={{ color: '#666', fontSize: '16px' }}>Fetching a new joke...</p>
          </div>
        ) : joke ? (
          // Joke content
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              animation: 'fadeIn 0.5s ease-in-out'
            }}
          >
            <div style={{ marginBottom: '15px' }}>
              {joke.type && (
                <span style={{ 
                  backgroundColor: '#e8f5e8', 
                  color: '#2e7d32',
                  padding: '4px 12px', 
                  borderRadius: '20px', 
                  fontSize: '12px',
                  textTransform: 'capitalize',
                  fontWeight: '500'
                }}>
                  {joke.type}
                </span>
              )}
            </div>
            <h3 style={{ 
              color: '#333', 
              marginBottom: '15px',
              fontSize: '18px',
              lineHeight: '1.4'
            }}>
              {joke.setup}
            </h3>
            <p style={{ 
              fontWeight: 'bold', 
              color: '#2196F3',
              fontStyle: 'italic',
              fontSize: '16px',
              marginBottom: '15px'
            }}>
              {joke.punchline}
            </p>
            {joke.id && (
              <small style={{ 
                color: '#999', 
                fontSize: '12px',
                display: 'block',
                marginTop: '10px'
              }}>
                Joke ID: {joke.id}
              </small>
            )}
          </div>
        ) : (
          // Empty state (shouldn't normally show due to useEffect)
          <div style={{ textAlign: 'center', color: '#666' }}>
            <p>Click the button to fetch a joke!</p>
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(20px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
    </div>
  );
};

export default axiosFetch;