import React, { useState } from 'react';

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

        <div className="search-form" style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '10px', backgroundColor: '#f1f1f1' }}>

            <h2>Search Properties</h2>
            <form onSubmit={handleSubmit}>


                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
                    {/*type*/}
                    <label>Type:</label>
                    <select name="type" value={criteria.type} onChange={handleChange}>
                        <option value="any">Any</option>
                        <option value="house">House</option>
                        <option value="Flat">Flat</option>
                    </select>

                    {/*price*/}
                    <label>Min Price:</label>
                    <input type="number" name="minPrice" value={criteria.minPrice} onChange={handleChange} />

                    <label>Max Price:</label>
                    <input type="number" name="maxPrice" value={criteria.maxPrice} onChange={handleChange} />

                    {/*bedrooms*/}
                    <label>Min Bedrooms:</label>
                    <input type="number" name="minBedrooms" value={criteria.minBedrooms} onChange={handleChange} />

                    <label>Max Bedrooms:</label>
                    <input type="number" name="maxBedrooms" value={criteria.maxBedrooms} onChange={handleChange} />
 
                    {/*postcode*/}
                    <label>Postcode:</label>
                    <input type="text" name="postcode" value={criteria.postcode} onChange={handleChange} />

                    
                    <button type="submit" style={{ padding: '10px 15px', backgroundColor: '#28a745', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Search
                    </button>

                    <button type="button" onClick={handleReset} style={{ padding: '10px 15px', backgroundColor: '#dc3545', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        Reset
                    </button>

                </div>
            </form>
        </div>
    );
}

export default SearchForm;
