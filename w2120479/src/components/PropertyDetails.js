import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import propertiesData from "../properties.json";

function PropertyDetails() {
    const { id } = useParams();
    const property = propertiesData.properties.find(p => p.id === id);
    const [activeTab, setActiveTab] = useState('description');

    if (!property)
        return <div>Property not found<Link to="/" >Go back</Link></div>;

    return (
        <div className="property-details" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f9f9f9' }}>
            
            {/*back link*/}
            <Link to="/">Go back</Link>

            <h2>{property.location}</h2>
            <h3 style={{ color: '#555' }}>${property.price.toLocaleString()}</h3>

            {/*Gallery*/}
            <div style = {{ display: 'flex', gap: '10px', overflowX: 'auto', marginBottom: '20px' }}>
                {/*loop through images*/}
                {property.images && property.images.map((img, index) => (
                    <img 
                        key={index} 
                        src={'/' + img}
                        alt="room" style = {{ width: '150px', objectFit: 'cover', borderRadius: '10px' }}/>
                ))}
            </div>  

            {/*Tabs*/}
            <div className="tabs" style={{ marginBottom: '20px' }}>
                <button onClick={() => setActiveTab('description')} style={{ padding: '10px 20px', backgroundColor: activeTab === 'description' ? '#007bff' : '#e9ecef', color: activeTab === 'description' ? 'white' : '#333', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Description</button>
                <button onClick={() => setActiveTab('floorplan')} style={{ padding: '10px 20px', backgroundColor: activeTab === 'floorplan' ? '#007bff' : '#e9ecef', color: activeTab === 'floorplan' ? 'white' : '#333', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}>Floor Plan</button>
                <button onClick={() => setActiveTab('location')} style={{ padding: '10px 20px', backgroundColor: activeTab === 'location' ? '#007bff' : '#e9ecef', color: activeTab === 'location' ? 'white' : '#333', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '10px' }}>Location</button>
            </div>

            {/*Tab Content*/}
            <div className="tab-content" style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '15px', backgroundColor: '#fff' }}>    
                {activeTab === 'description' && <p>{property.description}</p>}
                {activeTab === 'floorplan' && <p>{property.floorplan}</p>}
                {activeTab === 'location' && <p>{property.location}</p>}
            </div> 
        </div>
    );
}   