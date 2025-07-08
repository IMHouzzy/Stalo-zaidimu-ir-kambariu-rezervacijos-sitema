import React, { useState, useEffect } from 'react';
import "../App.css";
import { updateGame } from '../api/apiService'; // Adjust path if needed
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams

const Edit = () => {
    const { id } = useParams(); // Get the ID of the game to edit from the URL
    const navigate = useNavigate(); // Initialize the navigate function
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [allowedAge, setAllowedAge] = useState('');
    const [image, setImage] = useState('');

    console.log(id); // Log the ID to see if it's available

    // Fetch data when the ID changes
    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await fetch(`http://localhost:5244/Edit/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch game data');
                }
                const gameData = await response.json();
                console.log("Fetched Game Data:", gameData); // Log fetched data
                setName(gameData.name);
                setDescription(gameData.description);
                setPrice(gameData.price);
                setAllowedAge(gameData.alowedAge);
                setImage(gameData.image);
            } catch (error) {
                console.error('Error fetching game data:', error);
            }
        };

        if (id) {
            fetchGameData();
        } else {
            console.error("No valid ID found in the URL");
        }
    }, [id]); // Re-run when the ID changes

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedGame = {
            IdStaloZaidimas: id,
            Name: name,
            Description: description,
            Price: price,
            AlowedAge: allowedAge,
            Image: image,
            // Handle the image upload separately if needed
        };

        try {
            await updateGame(id, updatedGame);
            console.log("Game updated:", updatedGame);

            // Navigate back to the "Stalo-Žaidimų-Sąrašas" page
            navigate('/Stalo-Žaidimų-Sąrašas');
        } catch (error) {
            console.error('Failed to save changes:', error);
        }
    };
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the uploaded file
        if (file) {
            const fileName = file.name; // Get the full filename
            setImage(fileName); // Save only the filename in the state
        }
    };
    return (
        <div id="content">
            <div id="contentRight">
                <section className="reservation-section">
                    <h2>Redaguoti</h2>
                    <form className="reservation-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Pavadinimas</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Aprašymas</label>
                            <textarea
                                id="description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Kaina:</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                min="1"
                                step="0.01"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Įveskite kainą"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="allowedAge">Rekomenduojamas amžius</label>
                            <input
                                type="number"
                                id="allowedAge"
                                name="allowedAge"
                                min="1"
                                value={allowedAge}
                                onChange={(e) => setAllowedAge(e.target.value)}
                                placeholder="Amžių"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="image">Paveikslėlis</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept=".png, .jpg, .jpeg" // Restrict to image formats
                                onChange={handleImageChange} // Call handler when file is selected

                            />
                            <p>Pasirinktas failas: {image}</p>
                        </div>
                        <div className="form-group">
                            <label>Game ID:</label>
                            <span>{id}</span>
                        </div>

                        <div className="form-group">
                            <button type="submit">Išsaugoti</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Edit;
