import react from "react";
import './App.css';
import propertiesData from "./properties.json";
import SearchForm from "./components/SearchForm";
import PropertyCard from "./components/PropertyCard";

function App() {
  //load properties data into state//
  const [properties, setProperties] = useState(propertiesData.properties);

  //set filtered properties state//
  const [filteredProperties, setFilteredProperties] = useState(propertiesData.properties);

  //set favorites state//
  const [favorites, setFavorites] = useState([]);


  //handle search after clicks search//
  const handleSearch = (searchCriteria) => {
    //filter properties based on search criteria//
    const results = properties.filter(property => {
      
      //check each criteria//
      const typeMatch = searchCriteria.type === "any" || property.type === searchCriteria.type;
      const minPriceMatch = searchCriteria.minPrice === "" || property.price >= parseInt(searchCriteria.minPrice);
      const maxPriceMatch = searchCriteria.maxPrice === "" || property.price <= parseInt(searchCriteria.maxPrice);
      const minBedroomsMatch = searchCriteria.minBedrooms === "" || property.bedrooms >= parseInt(searchCriteria.minBedrooms);
      const maxBedroomsMatch = searchCriteria.maxBedrooms === "" || property.bedrooms <= parseInt(searchCriteria.maxBedrooms);
      const postcodeMatch = searchCriteria.postcode === "" || property.location.toLowerCase().includes(searchCriteria.postcode.toLowerCase());

      return typeMatch && minPriceMatch && maxPriceMatch && minBedroomsMatch && maxBedroomsMatch && postcodeMatch;
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

  return (
    <div className="App">
      <header>
        <h1>W2120479</h1>
      </header>

      <main>

        {/* Search Form Component */}
        <SearchForm onSearch={handleSearch} />
        
        {/* Properties List */}
        <h2>Properties results ({filteredProperties.length})</h2>
        <section className="properties-list" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          
          {/* Show message if no properties found */}
          {filteredProperties.length === 0 && <p>No properties found matching the criteria.</p>}

          {/*loop for filtered properties and show them*/}
          {filteredProperties.map(property => (
            <PropertyCard 
            key={property.id} 
            property={property} 
            onAddToFavorites={AddToFavorites} 
            onRemoveFromFavorites={RemoveFromFavorites} />
          ))}
          
        </section>

        {/* Favorites List */}
        {favorites.length > 0 && (
          <section className="favorites-list" style={{backgroundColor: '#b6dcf4ff', padding: '15px', border: '2px solid #000', borderRadius: '10px', marginTop: '30px'}}>
            <h2>Favorites</h2>
            <ul>
              {favorites.map(fav => (
                <li key={fav.id}>
                  <button 
                  onClick={() => RemoveFromFavorites(fav.id)}
                  style={{ margingLeft: '10px', color: 'red', cursor: 'pointer', border: 'none', background: 'none' }}>
                  [Remove]
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
  
