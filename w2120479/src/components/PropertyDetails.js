import React, { useState } from 'react';
import '../styles/PropertyDetails.css';
function PropertyDetails({ property, onBack }) {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className='property-details'>
      
      {/* BACK BUTTON */}
      <button
        onClick={onBack} className='back-btn'>
        Back to Search
      </button>

      {/* TITLE */}
      <h2>{property.location}</h2>
      <h2 className='price'>
        {property.price.toLocaleString()}
      </h2>

      {/* GALLERY */}
      <div className='gallery'>
        {property.images && property.images.map((img, index) => (
         <div className="gallery-item" key={index}> 
          <img
            key={index}
            src={`${process.env.PUBLIC_URL}/${img}`}
            alt="property"
           
          />
         </div> 
        ))}
      </div>

      {/* TABS */}
      <div className='tabs'>
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
      <div className='tab-content'>
      {activeTab === 'description' && (
        <div>
          <h3>Description</h3>
          <p>{property.description}</p>
          <p><strong>Added:</strong> {property.added.day}/{property.added.month}/{property.added.year}</p>

        </div>
      )}

      {activeTab === 'floorplan' && (
      <div className='floorplan-tab'>
       <img
        src={`${process.env.PUBLIC_URL}/${property.floorplan}`}
        alt="floorplan"
        className='floorplan-img'
       />
      </div>
)}

      {activeTab === 'map' && (
        <div style={{ padding: '40px', background: '#e0f7fa', textAlign: 'center' }}>
          Google Map Widget
        </div>
      )}

    </div>
    </div>
  );
}

export default PropertyDetails;
