import React from 'react';
import "../styles/NavBar.css";

function NavBar ({ onLogoClick }) {
    return (
        <nav className='navbar'>

            <h2 className='logo'
              onClick={onLogoClick}
              >
                EstateX
            </h2>

            <div className='navbar-links'>
                <span className='navbar-link'>For Sale</span>
                <span className='navbar-link'>To Rent</span>
                <span className='navbar-link'>Contact Us</span>
            </div>
        </nav>
    );
}

export default NavBar;