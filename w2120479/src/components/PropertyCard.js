import React from "react";
import "../styles/PropertyCard.css";

function PropertyCard({ property, onAddToFavorites }) {
  return (
    <div className="property-card" >

        <img src={process.env.PUBLIC_URL + "/" +property.picture} alt={property.title} />
        

      
        <h3>{property.location}</h3>
        <h4 >{property.price.toLocaleString()}</h4>

        <p>Type: {property.type}</p>
        <p>Bedrooms: {property.bedrooms}</p>
        <p>Description: {property.description}</p>

        <button 
          className="btn favorite"
          onClick={() => onAddToFavorites(property)}

          >
            Add To Favorites
        </button>

    </div>
  );
}

export default PropertyCard;