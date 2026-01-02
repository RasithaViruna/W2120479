import React from 'react';
import SearchForm from '../components/SearchForm';
import PropertyCard from '../components/PropertyCard';

function Home({
  properties,
  onSearch,
  onViewDetails,
  favorites,
  onAddFavorite,
  onRemoveFavorite
}) {
  return (
    <main className="main">

      {/* HERO SECTION */}
      <section className="hero">
        <h1>Find Your Next Home</h1>
        <p>Modern properties for sale and rent</p>
      </section>

      {/* SEARCH */}
      <SearchForm onSearch={onSearch} />

      {/* CONTENT */}
      <div className="content-layout">

        {/* PROPERTY LIST */}
        <section className="property">
          {properties.length === 0 && (
            <p>No properties found</p>
          )}

          {properties.map((property) => (
            <div key={property.id} className="prop-card">
              <PropertyCard
                property={property}
                onAddToFavorites={onAddFavorite}
              />

              <button
                className="btn info"
                onClick={() => onViewDetails(property)}
              >
                View Details
              </button>
            </div>
          ))}
        </section>

        {/* FAVORITES */}
        {favorites.length > 0 && (
          <aside className="favorites-bar">
            <h2>Favorites</h2>
            <ul>
              {favorites.map((fav) => (
                <li key={fav.id} className="favorite-item">
                  {fav.location}
                  <button
                    className="btn remove"
                    onClick={() => onRemoveFavorite(fav)}
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
  );
}

export default Home;
