import React, { useState } from 'react';
import "../App.css";
import { useNavigate } from 'react-router-dom';
import { addRoom } from '../api/apiService'; // Import the addRoom function

const AddRoom = () => {
    const [roomNr, setRoomNr] = useState('');
    const [maxPeople, setMaxPeople] = useState('');
    const [descrioption, setDescrioption] = useState('');
    const [priceRate, setPriceRate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newRoom = {
            RoomNr: roomNr,
            MaxPeople: maxPeople,
            Descrioption: descrioption,
            PriceRate: priceRate,
        };

        try {
            await addRoom(newRoom); // Use the API service function
            navigate('/rooms'); // Redirect after successfully adding the room
        } catch (error) {
            console.error('Failed to add room:', error);
        }
    };

    return (
        <div id="content">
            <div id="contentRight">
                <section className="reservation-section">
                    <h2>Pridėti Naują Kambarį</h2>
                    <form className="reservation-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="roomNr">Kambario Numeris</label>
                            <input
                                type="number"
                                id="roomNr"
                                name="roomNr"
                                min="1"
                                value={roomNr}
                                onChange={(e) => setRoomNr(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="maxPeople">Maksimalus Žmonių Skaičius</label>
                            <input
                                type="number"
                                id="maxPeople"
                                name="maxPeople"
                                min="1"
                                value={maxPeople}
                                onChange={(e) => setMaxPeople(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="descrioption">Aprašymas</label>
                            <textarea
                                id="descrioption"
                                name="descrioption"
                                value={descrioption}
                                onChange={(e) => setDescrioption(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="priceRate">Kainos Tarifas</label>
                            <input
                                type="number"
                                id="priceRate"
                                name="priceRate"
                                step="0.01"
                                min="1"
                                value={priceRate}
                                onChange={(e) => setPriceRate(e.target.value)}
                                placeholder="Įveskite kainą"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <button type="submit">Pridėti Kambarį</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default AddRoom;
