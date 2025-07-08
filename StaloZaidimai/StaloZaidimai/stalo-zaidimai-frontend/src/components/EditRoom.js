import React, { useState, useEffect } from 'react';
import "../App.css";
import { updateRoom } from '../api/apiService'; // Adjust path if needed
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams

const EditRoom = () => {
    const { id } = useParams(); // Get the ID of the room from the URL
    const navigate = useNavigate(); // Initialize the navigate function
    const [roomNr, setRoomNr] = useState('');
    const [maxPeople, setMaxPeople] = useState('');
    const [descrioption, setDescriotion] = useState('');
    const [priceRate, setPriceRate] = useState('');

    console.log(id); // Log the ID to see if it's available

    // Fetch data when the ID changes
    useEffect(() => {
        const fetchRoomData = async () => {
            try {
                const response = await fetch(`http://localhost:5244/EditRoom/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch room data');
                }
                const roomData = await response.json();
                console.log("Fetched Room Data:", roomData); // Log fetched data
                setRoomNr(roomData.roomNr);
                setMaxPeople(roomData.maxPeople);
                setDescriotion(roomData.descrioption);
                setPriceRate(roomData.priceRate);
            } catch (error) {
                console.error('Error fetching room data:', error);
            }
        };

        if (id) {
            fetchRoomData();
        } else {
            console.error("No valid ID found in the URL");
        }
    }, [id]); // Re-run when the ID changes

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedRoom = {
            IdKambarys: id,
            RoomNr: roomNr,
            MaxPeople: maxPeople,
            Descrioption: descrioption,
            PriceRate: priceRate,
        };

        try {
            await updateRoom(id, updatedRoom);
            console.log("Room updated:", updatedRoom);

            // Navigate back to the "Room-List" page
            navigate('/rooms');
        } catch (error) {
            console.error('Failed to save changes:', error);
        }
    };

    return (
        <div id="content">
            <div id="contentRight">
                <section className="reservation-section">
                    <h2>Edit Room</h2>
                    <form className="reservation-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="roomNr">Room Number</label>
                            <input
                                type="number"
                                id="roomNr"
                                name="roomNr"
                                value={roomNr}
                                onChange={(e) => setRoomNr(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="maxPeople">Max People</label>
                            <input
                                type="number"
                                id="maxPeople"
                                name="maxPeople"
                                value={maxPeople}
                                onChange={(e) => setMaxPeople(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="descrioption">Description</label>
                            <textarea
                                id="descrioption"
                                name="descrioption"
                                value={descrioption}
                                onChange={(e) => setDescriotion(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="priceRate">Price Rate:</label>
                            <input
                                type="number"
                                id="priceRate"
                                name="priceRate"
                                step="0.01"
                                value={priceRate}
                                onChange={(e) => setPriceRate(e.target.value)}
                                placeholder="Enter price rate"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Room ID:</label>
                            <span>{id}</span>
                        </div>

                        <div className="form-group">
                            <button type="submit">Save Changes</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default EditRoom;
