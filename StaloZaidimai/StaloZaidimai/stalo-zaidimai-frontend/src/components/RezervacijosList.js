import React, { useState, useEffect } from 'react';
import "../App.css";
import { fetchReservations, deleteReservations } from '../api/apiService';
import { useNavigate } from 'react-router-dom';
const RezervacijosSarasas = () => {
    const navigate = useNavigate();
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchReservations();
                setReservations(data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch reservations:', error);
                setError('Unable to fetch reservations. Please try again later.');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this room?');
        if (confirmDelete) {
            try {
                await deleteReservations(id);
                setReservations(reservations.filter(reservations => reservations.idRezervacija !== id)); // Remove the deleted room from state
            } catch (error) {
                console.error('Error deleting room:', error);
            }
        }
    };

    return (
        <div id="content">
            <div id="contentRight">
                <section className="room-list-section">
                    <div className="room-list-title">
                        <h2>Kambariu sąrašas</h2>
                        <button onClick={() => navigate("/Kambario-rezervacija")}>Pridėti naują rezervaciją +</button>
                    </div>
                    {reservations.length ? (
                        reservations.map((reservation) => (
                            <div className="room-item" key={reservation.idRezervacija}>
                                <div className="room-info">
                                    <h3>Kambario numeris: {reservation.address}</h3>
                                    <p>Kambario nr.: {reservation.roomNumber}</p>
                                    <p>Žaidimo pavadinimas: {reservation.gameName}</p>
                                    <p>Žmonių kiekis: {reservation.peopleAmount}</p>
                                    <p>Laikas: {reservation.startTime} - {reservation.endTime}</p>
                                    <h1>Data: {reservation.date}</h1>

                                    <div className="edit-remove-buttons">
                                        <div className="button-container">
                                            <button
                                                className="action-button edit-button"
                                                style={{ marginRight: '10px' }}
                                                onClick={() => navigate(`/editReservations/${reservation.idRezervacija}`)} // Redirect to Edit page
                                            >
                                                Redaguot
                                            </button>
                                            <button
                                                className="action-button delete-button"
                                                onClick={() => handleDelete(reservation.idRezervacija)} // Call handleDelete
                                            >
                                                Pašalinti
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No rooms available.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default RezervacijosSarasas;
