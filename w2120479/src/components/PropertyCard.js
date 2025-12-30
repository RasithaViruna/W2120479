import React from "react";

function PropertyCard({ property, onAddToFavorites }) {
  return (
    <div className="property-card" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '15px', marginBottom: '15px', backgroundColor: '#f9f9f9' }}>

        <img src={property.picture} alt={property.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px' }} />

        <h3>{property.location}</h3>
        <h4 style={{ color: '#555' }}>{property.price.toLocaleString()}</h4>

        <p>Type: {property.type}</p>
        <p>Bedrooms: {property.bedrooms}</p>
        <p>Description: {property.description}</p>

        <button 
          onClick={() => onAddToFavorites(property)}
          style={{ marginTop: '10px', padding: '10px 15px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
          >
            Add To Favorites
        </button>

    </div>
  );
}

export default PropertyCard;