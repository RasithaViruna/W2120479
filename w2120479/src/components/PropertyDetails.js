import React, { useState } from 'react';
import { Button, Typography, Card, CardMedia, Box } from '@mui/material';
import '../styles/PropertyDetails.css';

function PropertyDetails({ property, onBack }) {
  const [activeTab, setActiveTab] = useState('description');
  const [mainImage, setMainImage] = useState(property.images[0]);

  return (
    <div className='property-details'>

      {/* BACK BUTTON */}
      <Button
        variant="contained"
        className="back-btn"
        onClick={onBack}
      >
        Back to Search
      </Button>

      {/* TITLE + PRICE */}
      <div className="property-header">
        <Typography variant="h3" className="location">{property.location}</Typography>
        <Typography variant="h4" className="price">Rs. {property.price.toLocaleString()}</Typography>
      </div>

      {/* GALLERY WITH THUMBNAILS */}
      <div className='gallery-main'>
        <Card className="gallery-main-item">
          <CardMedia
            component="img"
            image={`${process.env.PUBLIC_URL}/${mainImage}`}
            alt="main property"
          />
        </Card>

        <div className="gallery-thumbs">
          {property.images.map((img, index) => (
            <img
              key={index}
              src={`${process.env.PUBLIC_URL}/${img}`}
              alt={`thumb-${index}`}
              className={mainImage === img ? 'active-thumb' : ''}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      {/* TABS */}
      <div className='tabs'>
        <button
          className={activeTab === 'description' ? 'active' : ''}
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button
          className={activeTab === 'floorplan' ? 'active' : ''}
          onClick={() => setActiveTab('floorplan')}
        >
          Floor Plan
        </button>
        <button
          className={activeTab === 'map' ? 'active' : ''}
          onClick={() => setActiveTab('map')}
        >
          Map
        </button>
      </div>

      {/* TAB CONTENT */}
      <div className='tab-content'>
        {activeTab === 'description' && (
          <Box>
            <Typography variant="h5" gutterBottom>Description</Typography>
            <Typography paragraph>{property.description}</Typography>
            <Typography variant="body2">
              <strong>Added:</strong> {property.added.day}/{property.added.month}/{property.added.year}
            </Typography>
          </Box>
        )}

        {activeTab === 'floorplan' && (
          <Box className="floorplan-tab">
            <CardMedia
              component="img"
              image={`${process.env.PUBLIC_URL}/${property.floorplan}`}
              alt="floorplan"
              className="floorplan-img"
            />
          </Box>
        )}

        {activeTab === 'map' && (
          <iframe
              title="property-map"
              width="100%"
              height="400"
              style={{ border: 0, borderRadius: '12px' }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
            ></iframe>
        )}
      </div>

    </div>
  );
}

export default PropertyDetails;
