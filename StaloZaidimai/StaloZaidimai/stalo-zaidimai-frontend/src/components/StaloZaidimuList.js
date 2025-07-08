import React, { useEffect, useState } from 'react';
import "../App.css";
import { getData, deleteGame } from '../api/apiService';  // Adjust path if needed
import { useNavigate } from 'react-router-dom';

const StaloZaidimuList = () => {
    const navigate = useNavigate();
    const [zaidimas, setZaidimas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData();
                setZaidimas(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this game?');
        console.log(id);
        if (confirmDelete) {
            try {
                await deleteGame(id);
                setZaidimas(zaidimas.filter(game => game.idStaloZaidimas !== id));  // Remove the deleted game from the state
            } catch (error) {
                console.error('Error deleting game:', error);
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div id="content">
            <div id="contentRight">
                <section className="board-games-section">
                    <div className="stalo-zaidimu-title">
                        <h2>Stalo Žaidimų Sąrašas</h2>
                        <button onClick={() => navigate("/AddGame")}>Pridėti naują stalo žaidimą +</button>
                    </div>
                    {zaidimas.length ? (
                        zaidimas.map((item) => (
                            <div className="game-item" key={item.idStaloZaidimas}>
                                <img
                                    src={`http://localhost/StaloZaidimai/FontEnd/images/${item.image}`}
                                    className="game-image"
                                    alt={`${item.name} image`}
                                />
                                <div className="game-info">
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p>Rekomenduojamas amžius: {item.alowedAge}</p>
                                    <h1>Kaina: {item.price}€</h1>
                                    <div className="edit-remove-buttons">
                                        <div className="button-container">
                                            <button
                                                className="action-button edit-button"
                                                style={{ marginRight: '10px' }}
                                                onClick={() => navigate(`/edit/${item.idStaloZaidimas}`)} // Redirect to Edit page
                                            >
                                                Redaguoti
                                            </button>
                                            <button
                                                className="action-button delete-button"
                                                onClick={() => handleDelete(item.idStaloZaidimas)} // Call handleDelete
                                            >
                                                Pašalinti
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No data available.</p>
                    )}
                </section>
            </div>
        </div>
    );
};

export default StaloZaidimuList;
