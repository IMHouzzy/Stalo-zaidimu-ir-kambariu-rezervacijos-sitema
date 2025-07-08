import React, { } from 'react';
import "../App.css";
//import { getNaudotojai } from '../api/apiService';  // Adjust path if needed

const MainPage = () => {
    return (
        <div id="content">
            <div id="topMenu">
            </div>
            <div id="contentRight">
                    <section class="about-section">
                        <div class="text-image-container">
                            <div class="text-content">
                                <h1>Apie mus</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                                    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                    est laborum.</p>
                            </div>
                            <div class="image-content">
                                <img src="main.jpg" alt="About Us Image" />
                            </div>
                        </div>
                    </section>
            </div>
        </div>
    );
}
export default MainPage;
