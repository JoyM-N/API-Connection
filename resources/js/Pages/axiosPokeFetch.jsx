import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import axios from 'axios';

const DogFetch = () => {
  const [dog, setDog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDog = async () => {
    setLoading(true);
    setError(null);
     try {
        const res = await axios.get('https://dogapi.dog/api/v2/breeds');
        // Get the first breed from the data array
        const firstBreed = res.data.data[0];
        setDog(firstBreed);
        console.log('Dog data:', firstBreed);
    } catch (err) {
        console.error('Error fetching Dog:', err);
        setError(err.message);
    } finally {
        setLoading(false);
    }
    
//     try {
//       const res = await axios.get('https://dogapi.dog/api/v2/breeds');
//       setDog(res.data);
//       console.log('Dog data:', res.data);
//     } catch (err) {
//       console.error('Error fetching Dog:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }

  };

  // useEffect to fetch Dog data when component mounts
  useEffect(() => {
    fetchDog();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <Navbar />
      <h2>Dog Data Fetch</h2>
      {dog && (
        <div>
          <h1>{dog.attributes.name}</h1>
          <p>ID: {dog.id}</p>
          {/* Add more fields as needed */}
  


      <button
        onClick={fetchDog}
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: loading ? '#ccc' : '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px',
          fontWeight: '500'
        }}
      >
        {loading ? 'Loading...' : 'Refresh Pokemon Data'}
      </button>

      {/* Dog Card Container */}
      <div
        style={{
          minHeight: '400px',
          border: '2px solid #e5e7eb',
          borderRadius: '16px',
          padding: '24px',
          backgroundColor: '#ffffff',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease',
          maxWidth: '600px',
          margin: '0 auto'
        }}
      >
        {loading ? (
          // Loading state
          <div style={{ textAlign: 'center', paddingTop: '80px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                border: '4px solid #f3f4f6',
                borderTop: '4px solid #6366f1',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 20px'
              }}
            />
            <p style={{ color: '#6b7280', fontSize: '18px' }}>Loading Pokemon data...</p>
          </div>
        ) : error ? (
          // Error state
          <div style={{ textAlign: 'center', paddingTop: '80px' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
            <h3 style={{ color: '#dc2626', marginBottom: '8px' }}>Error</h3>
            <p style={{ color: '#6b7280' }}>{error}</p>
          </div>
        ) : dog ? (
          // Dog data display
          <div
            style={{
              animation: 'fadeIn 0.6s ease-in-out',
              textAlign: 'center'
            }}
          >
            {/* Dog Header */}
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ 
                fontSize: '32px', 
                color: '#1f2937',
                marginBottom: '8px',
                textTransform: 'capitalize'
              }}>
                {dog.attributes?.name}
              </h1>
              <p style={{ color: '#6b7280', fontSize: '14px' }}>
                ID: {dog.id}
              </p>
            </div>

            {/* Dog Info */}
            <div style={{ marginBottom: '24px', textAlign: 'center' }}>
              <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '8px' }}>
                Breed Group: {dog.attributes?.breed_group || 'N/A'}
              </p>
              <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '8px' }}>
                Life Span: {dog.attributes?.life_span || 'N/A'}
              </p>
              <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '8px' }}>
                Origin: {dog.attributes?.origin || 'N/A'}
              </p>
              <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '8px' }}>
                Temperament: {dog.attributes?.temperament || 'N/A'}
              </p>
            </div>
          </div>
        ) : null}
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}</style>
        </div>
      )}
    </div>
  );
};

// Helper function to get type colors
const getTypeColor = (type) => {
  const typeColors = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };
  return typeColors[type] || '#68A090';
};

export default DogFetch;