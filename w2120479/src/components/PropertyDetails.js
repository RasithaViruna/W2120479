import React, { useState } from 'react';

function PropertyDetails({ property, onBack }) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      
      {/* BACK BUTTON */}
      <button
        onClick={onBack}
        style={{
          marginBottom: '20px',
          padding: '10px 15px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Back to Search
      </button>

      {/* TITLE */}
      <h2>{property.location}</h2>
      <h2 style={{ color: '#007bff' }}>
        {property.price.toLocaleString()}
      </h2>

      {/* GALLERY */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto' }}>
        {property.images && property.images.map((img, index) => (
          <img
            key={index}
            src={'/' + img}
            alt="property"
            style={{ height: '150px', borderRadius: '8px', border: '1px solid #ccc' }}
          />
        ))}
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', borderBottom: '2px solid #ccc', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('description')}
          style={{ padding: '10px 20px', background: activeTab === 'description' ? '#eee' : '#fff', border: 'none' }}
        >
          Description
        </button>

        <button
          onClick={() => setActiveTab('floorplan')}
          style={{ padding: '10px 20px', background: activeTab === 'floorplan' ? '#eee' : '#fff', border: 'none' }}
        >
          Floor Plan
        </button>

        <button
          onClick={() => setActiveTab('map')}
          style={{ padding: '10px 20px', background: activeTab === 'map' ? '#eee' : '#fff', border: 'none' }}
        >
          Map
        </button>
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'description' && (
        <div>
          <h3>Description</h3>
          <p>{property.description}</p>
          <p><strong>Added:</strong> {property.added.day}/{property.added.month}/{property.added.year}</p>

        </div>
      )}

      {activeTab === 'floorplan' && (
        <div style={{ padding: '40px', background: '#ddd', textAlign: 'center' }}>
          Floor Plan Image
        </div>
      )}

      {activeTab === 'map' && (
        <div style={{ padding: '40px', background: '#e0f7fa', textAlign: 'center' }}>
          Google Map Widget
        </div>
      )}

    </div>
  );
}

export default PropertyDetails;
