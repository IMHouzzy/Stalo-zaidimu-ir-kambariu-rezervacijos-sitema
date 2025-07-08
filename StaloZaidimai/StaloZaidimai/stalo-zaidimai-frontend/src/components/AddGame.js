import React, { useState } from 'react';
import "../App.css";
import { useNavigate } from 'react-router-dom';
import { addGame } from '../api/apiService'; // Import the addGame function

const AddGame = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [allowedAge, setAllowedAge] = useState('');
    const [image, setImage] = useState('');
    const navigate = useNavigate();

    // Handle file input
    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the uploaded file
        if (file) {
            const fileName = file.name; // Get the full filename
            setImage(fileName); // Save only the filename in the state
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newGame = {
            Name: name,
            Description: description,
            Price: price,
            AlowedAge: allowedAge,
            Image: image, // Save the filename and format
        };

        try {
            await addGame(newGame); // Use the API service function
            navigate('/Stalo-Žaidimų-Sąrašas'); // Redirect after successfully adding the game
        } catch (error) {
            console.error('Failed to add game:', error);
        }
    };

    return (
        <div id="content">
            <div id="contentRight">
                <section className="reservation-section">
                    <h2>Pridėti Naują Žaidimą</h2>
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
                            <label htmlFor="price">Kaina</label>
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
                                required
                            />
                            <p>Pasirinktas failas: {image}</p>
                        </div>

                        <div className="form-group">
                            <button type="submit">Pridėti Žaidimą</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default AddGame;
