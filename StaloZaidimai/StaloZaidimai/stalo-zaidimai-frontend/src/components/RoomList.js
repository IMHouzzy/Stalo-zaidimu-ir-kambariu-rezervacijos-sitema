import React, { useEffect, useState } from 'react';
import "../App.css";
import { getRoom, deleteRoom } from '../api/apiService';  // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

const RoomList = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch room data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getRoom(); // API for rooms
                setRooms(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this room?');
        if (confirmDelete) {
            try {
                await deleteRoom(id);
                setRooms(rooms.filter(room => room.idKambarys !== id)); // Remove the deleted room from state
            } catch (error) {
                console.error('Error deleting room:', error);
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div id="content">
            <div id="contentRight">
                <section className="room-list-section">
                    <div className="room-list-title">
                        <h2>Kambariu sąrašas</h2>
                        <button onClick={() => navigate("/AddRoom")}>Pridėti naują kambarį +</button>
                    </div>
                    {rooms.length ? (
                        rooms.map((item) => (
                            <div className="room-item" key={item.idKambarys}>
                                <div className="room-info">
                                    <h3>Kambario numeris: {item.roomNr}</h3>
                                    <p>Aprašymas: {item.descrioption}</p>
                                    <p>Maksimalus kiekis žmonių: {item.maxPeople}</p>
                                    <h1>Kaina: {item.priceRate}€</h1>
                                    <div className="edit-remove-buttons">
                                        <div className="button-container">
                                            <button
                                                className="action-button edit-button"
                                                style={{ marginRight: '10px' }}
                                                onClick={() => navigate(`/editRoom/${item.idKambarys}`)} // Redirect to Edit page
                                            >
                                                Redaguot
                                            </button>
                                            <button
                                                className="action-button delete-button"
                                                onClick={() => handleDelete(item.idKambarys)} // Call handleDelete
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

export default RoomList;
