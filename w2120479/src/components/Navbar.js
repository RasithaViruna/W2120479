import React from 'react';

function NavBar ({ onLogoClick }) {
    return (
        <nav style =  {{
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            padding: '10px 20px', 
            backgroundColor: '#333', 
            color: 'white',
            }}>

            <h2 
              onClick={onLogoClick}
              style={{ margin: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                W2120479
            </h2>

            <div>
                <span style={{ marginRight: '20px', cursor: 'pointer' }}>For Sale</span>
                <span style={{ marginRight: '20px', cursor: 'pointer' }}>To Rent</span>
                <span style={{ cursor: 'pointer' }}>Contact Us</span>
            </div>
        </nav>
    );
}

export default NavBar;