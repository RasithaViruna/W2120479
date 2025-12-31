import React, { useState } from 'react';
import "../styles/SearchForm.css";

function SearchForm({ onSearch }) {

    const[criteria, setCriteria] = useState({
        type: "any",
        minPrice: "",
        maxPrice: "",
        minBedrooms: "",
        maxBedrooms: "",
        postcode: ""
    });

    //handle input change//
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCriteria(prevCriteria => ({
            ...prevCriteria,
            [name]: value
        }));
    };

    //handle form submit//
    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(criteria);
    };

    //handle reset//
    const handleReset = ()=> {
        const resetCiteria = {
            type: "any",
            minPrice: "",
            maxPrice: "",
            minBedrooms: "",
            maxBedrooms: "",
            postcode:""
        };
        setCriteria(resetCiteria);
        onSearch({resetCiteria});
    }

    return (

        <div className="search-form" >

            <h2>Search Properties</h2>
            <form onSubmit={handleSubmit}>


                <div className='search'>
                    {/*type*/}
                  <div className="search-group">
                    <label>Type:</label>
                    <select name="type" value={criteria.type} onChange={handleChange}>
                        <option value="any">Any</option>
                        <option value="house">House</option>
                        <option value="Flat">Flat</option>
                    </select>
                  </div>

                    {/*price*/}
                  <div className="search-group">  
                    <label>Min Price:</label>
                    <input type="number" name="minPrice" value={criteria.minPrice} onChange={handleChange} />
                  </div>

                  <div className="search-group">
                    <label>Max Price:</label>
                    <input type="number" name="maxPrice" value={criteria.maxPrice} onChange={handleChange} />
                  </div>

                    {/*bedrooms*/}
                  <div className="search-group">
                    <label>Min Bedrooms:</label>
                    <input type="number" name="minBedrooms" value={criteria.minBedrooms} onChange={handleChange} />
                  </div>

                  <div className="search-group">
                    <label>Max Bedrooms:</label>
                    <input type="number" name="maxBedrooms" value={criteria.maxBedrooms} onChange={handleChange} />
                  </div>

                    {/*postcode*/}
                  <div className="search-group">
                    <label>Postcode:</label>
                    <input type="text" name="postcode" value={criteria.postcode} onChange={handleChange} />
                  </div>
                    
                    <button type="submit" >
                        Search
                    </button>

                    <button type="button" onClick={handleReset} >
                        Reset
                    </button>

                </div>
            </form>
        </div>
    );
}

export default SearchForm;
