import React, { useState } from 'react';
import './App.css';
import propertiesData from "./properties.json";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import SearchForm from "./components/SearchForm";
import PropertyCard from "./components/PropertyCard";
import PropertyDetails from './components/PropertyDetails';

function App() {
  //load properties data into state//
  const [properties] = useState(propertiesData.properties);
  //set filtered properties state//
  const [filteredProperties, setFilteredProperties] = useState(propertiesData.properties);
  //set favorites state//
  const [favorites, setFavorites] = useState([]);
  //set selected property for details view//
  const [selectedProperty, setSelectedProperty] = useState(null);



  //handle search after clicks search//
  const handleSearch = (searchCriteria) => {

    //filter properties based on search criteria//
    const results = properties.filter(property => {
      
      //check each criteria//
      const typeMatch = searchCriteria.type === "any" || property.type.toLowerCase() === searchCriteria.type.toLowerCase();
      
      //price//
      const minPriceMatch = Number(searchCriteria.minPriceMatch) || 0;
      const maxPriceMatch = Number(searchCriteria.maxPriceMatch) || 10000000;
      const priceMatch = property.price >= minPriceMatch && property.price <= maxPriceMatch;
      
      //bedrooms//
      const minBedroomsMatch = Number(searchCriteria.minBedroomsMatch) || 0;
      const maxBedroomsMatch = Number(searchCriteria.maxBedroomsMatch) || 100;
      const bedMatch = property.bedrooms >= minBedroomsMatch && property.bedrooms <= maxBedroomsMatch;
      
      //postcode//
      const postcodeMatch = searchCriteria.postcode === "" 
      || property.location
      .toLowerCase()
      .includes(searchCriteria.postcode.toLowerCase());


      return typeMatch && priceMatch && bedMatch && postcodeMatch;
    });

    //update filtered properties state//
    setFilteredProperties(results);
  };

  //handle add to favorites//
  const AddToFavorites = (property) => {

    //check if property is already in favorites//
    const isAlreadyThere = favorites.some(fav => fav.id === property.id);
    if (isAlreadyThere) {
      alert("Property is already in favorites!");
    } else {
      setFavorites([...favorites, property]);
    }
  };
  
  //handle remove from favorites//
  const RemoveFromFavorites = (property) => {

    //remove property from favorites//
    const updatedFavorites = favorites.filter(fav => fav.id !== property.id);
    setFavorites(updatedFavorites);
  };

  if (selectedProperty) {
    return (
      <div className="App">
        <NavBar onLogoClick={() => setSelectedProperty(null)} />

          <main style={{ padding: '20px' }}>
            <PropertyDetails 
              property={selectedProperty} 
              onBack={() => setSelectedProperty(null)} 
            />
          </main>

        <Footer />
      </div>

    );
  }


  return (
    <div className="App">
      <NavBar onLogoClick={() => setSelectedProperty(null)} />

        <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
          <SearchForm onSearch={handleSearch} />

          {favorites.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <h2>Favorites</h2>
              <ul>
                {favorites.map(fav => (
                  <li key={fav.id} style={{ marginBottom: '10px' }}>
                    {fav.location} - {fav.price.toLocaleString()}
                    <button 
                      onClick={() => RemoveFromFavorites(fav)}
                      style={{ marginLeft: '10px', padding: '5px 10px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                      Remove
                    </button>
                  </li> 
                ))}
              </ul>
            </div>
          )}
          
          <h2>results({filteredProperties.length})</h2>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {filteredProperties.length === 0 && <p>No properties found matching your criteria.</p>}

            {filteredProperties.map(property => (
              <div key = {property.id}>
                <PropertyCard 
                  property={property} 
                  onAddToFavorites={AddToFavorites}/>

                  <button 
                    onClick={() => setSelectedProperty(property)}
                    style={{ marginTop: '10px', padding: '10px 15px', backgroundColor: '#17a2b8', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    View Details
                  </button>
              </div>
            ))}
          </div>
        </main>
      <Footer />


    </div>  );
}


export default App;
  
