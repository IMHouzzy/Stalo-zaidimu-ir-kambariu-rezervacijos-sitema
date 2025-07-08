import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const navigate = useNavigate();

    return (
        <div id="content">
            <div id="contentRight">
                {/* Add the content of each section here based on the selected button */}
                <section className="about-section">
                
                    <div id="adminNavigation">
                        <h2>Administratoriaus funkcijos</h2>
                        <button className="adminButton" onClick={() => navigate("/rooms")}>Kambariai</button>
                        <button className="adminButton" onClick={() => navigate("/Stalo-Žaidimų-Sąrašas")}>Stalo Žaidimų Sąrašas</button>
                        <button className="adminButton" onClick={() => navigate("/employees")}>Darbuotojai</button>
                        <button className="adminButton" onClick={() => navigate("/GetReservations")}>Rezervacijom</button>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AdminPage;
