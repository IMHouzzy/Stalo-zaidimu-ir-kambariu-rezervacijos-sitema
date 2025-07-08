import React, { useState, useEffect } from 'react';
import "../App.css";
import { postReservation, fetchBoardGames, fetchRooms } from '../api/apiService';
import { useNavigate } from 'react-router-dom';

const Rezervacija = () => {
    const [address, setAddress] = useState('');
    const [roomNumber, setRoomNumber] = useState('');
    const [peopleNumber, setPeopleNumber] = useState('');
    const [gameId, setGameId] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');

    const [boardGames, setBoardGames] = useState([]);
    const [rooms, setRooms] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchGamesAndRooms = async () => {
            try {
                const games = await fetchBoardGames();
                setBoardGames(games);

                const roomsData = await fetchRooms();
                setRooms(roomsData);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchGamesAndRooms();
    }, []);

   const handleSubmit = async (event) => {
        event.preventDefault();

        // Calculate reservation end time (one hour after the start time)
        const calculateEndTime = (startTime) => {
            const [hours, minutes] = startTime.split(':').map(Number);
            const endTime = new Date();
            endTime.setHours(hours + 1);
            endTime.setMinutes(minutes);

            return `${String(endTime.getHours()).padStart(2, '0')}:${String(endTime.getMinutes()).padStart(2, '0')}`;
        };

        const endTime = calculateEndTime(time);

        // Send raw data to the backend
        const updatedReservationData = {
            Address: address,
            RoomNumber: parseInt(roomNumber), // Ensure this matches what the backend expects
            PeopleNumber: parseInt(peopleNumber), // People count
            GameId: parseInt(gameId), // Foreign Key for selected game
            UserId: 1, // Assuming user ID is fixed as 1, change as needed
            Date: date, // DateOnly format
            StartTime: `${time}:00`, // TimeOnly format (HH:MM:SS)
            EndTime: `${endTime}:00`, // TimeOnly format (HH:MM:SS)
        };

        // Log the request body before sending it
        console.log('Raw reservation data:', updatedReservationData);

       try {
           navigate('/');
            await postReservation(updatedReservationData);
            console.log('Reservation posted successfully');
            // Reset form data after successful reservation
            setAddress('');
            setRoomNumber('');
            setPeopleNumber('');
            setGameId('');
            setDate('');
            setTime('');
        } catch (error) {
            console.error('Error posting reservation:', error);
        }
    };

    return (
        <div id="content">
            <div id="contentRight">
                <section className="reservation-section">
                    <h2>Rezervuoti Kambarius</h2>
                    <form className="reservation-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="address">Pasirinkite vietą:</label>
                            <select
                                id="address"
                                name="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                            >
                                <option value="">Pasirinkite vietą...</option>
                                <option value="Lietuvos žaidimų centras, Gedimino pr. 9, Vilnius">
                                    Lietuvos žaidimų centras, Gedimino pr. 9, Vilnius
                                </option>
                                <option value="Kultūros fabrikas, Maironio g. 10, Kaunas">
                                    Kultūros fabrikas, Maironio g. 10, Kaunas
                                </option>
                                <option value="Klaipėdos kultūros ir komunikacijos centras, Šaulių g. 38, Klaipėda">
                                    Klaipėdos kultūros ir komunikacijos centras, Šaulių g. 38, Klaipėda
                                </option>
                                <option value="Šiaulių kultūros centras, Aušros al. 31, Šiauliai">
                                    Šiaulių kultūros centras, Aušros al. 31, Šiauliai
                                </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="gameId">Pasirinkite stalo žaidimą:</label>
                            <select
                                id="gameId"
                                name="gameId"
                                value={gameId}
                                onChange={(e) => setGameId(e.target.value)}
                                required
                            >
                                <option value="">Pasirinkite žaidimą...</option>
                                {boardGames.map((game) => (
                                    <option key={game.idStaloZaidimas} value={game.idStaloZaidimas}>
                                        {game.name} - {game.price}€
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="roomNumber">Pasirinkite kambario numerį:</label>
                            <select
                                id="roomNumber"
                                name="roomNumber"
                                value={roomNumber}
                                onChange={(e) => setRoomNumber(e.target.value)}
                                required
                            >
                                <option value="">Pasirinkite kambario numerį...</option>
                                {rooms.map((room) => (
                                    <option key={room.idKambarys} value={room.roomNr}>
                                        Kambarys {room.roomNr} - {room.maxPeople} žmonių
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="peopleNumber">Žmonių skaičius:</label>
                            <input
                                type="number"
                                id="peopleNumber"
                                name="peopleNumber"
                                min="1"
                                value={peopleNumber}
                                onChange={(e) => setPeopleNumber(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="date">Rezervacijos data:</label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="time">Laikas:</label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <button type="submit">Rezervuoti</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Rezervacija;
