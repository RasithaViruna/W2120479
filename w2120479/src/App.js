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
      const type = searchCriteria.type || "any";
      const typeMatch = 
         type === "any" || 
         property.type.toLowerCase() === type.toLowerCase();

      //price//
      const minPrice = Number(searchCriteria.minPrice) || 0;
      const maxPrice = Number(searchCriteria.maxPrice) || 10000000;
      const priceMatch = 
      property.price >= minPrice && 
      property.price <= maxPrice;
      
      //bedrooms//
      const minBedrooms = Number(searchCriteria.minBedrooms) || 0;
      const maxBedrooms = Number(searchCriteria.maxBedrooms) || 100;
      const bedMatch = 
      property.bedrooms >= minBedrooms && 
      property.bedrooms <= maxBedrooms;
      
      //postcode//
      const postcode = searchCriteria.postcode || "";
      const postcodeMatch = 
      postcode === ""||
      property.location.toLowerCase().includes(postcode.toLowerCase());
      


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





  //details// 
  if (selectedProperty) {
    return (
      <div className="App">
        <NavBar onLogoClick={() => setSelectedProperty(null)} />

          <main className='main'>
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
      
      {/* HERO SECTION */}
          <section className="hero">
            <NavBar onLogoClick={() => setSelectedProperty(null)} />
            <div className="hero-image">
             <img src={process.env.PUBLIC_URL + "/hero.jpg"} alt="home" className='hero-img' />
              <div className="hero-text">
                <div className='heroText'>
                <h2>EstateX</h2>
                <h1>Dream Home</h1>
                <p>Luxury & Comfort, Modern living starts here</p>
                </div>
                <p className="scroll-down"><strong>scroll down</strong></p>
              </div>
            </div>
          </section>
        <main className = "main">

        

          {/*search form*/}
          <SearchForm onSearch={handleSearch} />

          <div className='content-layout'>
            <section className='property'>
            {filteredProperties.length === 0 && <p>No properties found matching your criteria.</p>}

            {filteredProperties.map(property => (
              <div key = {property.id} className='prop-card'>
                <PropertyCard 
                  property={property} 
                  onAddToFavorites={AddToFavorites}/>

                  <button
                    className='btn info' 
                    onClick={() => setSelectedProperty(property)}
                    >
                    View Details
                  </button>
              </div>
            ))}
            </section>

            {favorites.length > 0 && (
            <aside className='favorites-bar'>
              <h2>Favorites</h2>
              <ul>
                {favorites.map(fav => (
                  <li key={fav.id} className='favorite-item'>
                    {fav.location} - {fav.price.toLocaleString()}
                    <button
                      className='btn remove' 
                      onClick={() => RemoveFromFavorites(fav)}
                      >
                      Remove
                    </button>
                  </li> 
                ))}
              </ul>
            </aside>
          )}

            
          </div>

          
        
        </main>
      <Footer />


    </div>  );
}


export default App;
  
