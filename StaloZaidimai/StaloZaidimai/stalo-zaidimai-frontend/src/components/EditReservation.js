import React, { useState, useEffect } from "react";
import { fetchReservationById, updateReservation, fetchBoardGames, fetchRooms } from "../api/apiService";
import { useNavigate, useParams } from 'react-router-dom';

const EditReservation = () => {
    const [address, setAddress] = useState(""); // Default address value
    const [roomNumber, setRoomNumber] = useState("");
    const [peopleNumber, setPeopleNumber] = useState("");
    const [gameId, setGameId] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const { id } = useParams(); // Get the ID of the reservation from the URL

    const [boardGames, setBoardGames] = useState([]);
    const [rooms, setRooms] = useState([]);
    const navigate = useNavigate();
    

    // Format time to ensure it's in HH:mm:ss format
   

    // Fetch the reservation details by ID when component mounts
    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const reservation = await fetchReservationById(id);
                setAddress(reservation.address);
                setRoomNumber(reservation.roomAmount);
                setPeopleNumber(reservation.peopleAmount);
                setGameId(reservation.fkStaloZaidimasidStaloZaidimas);
                setDate(reservation.date);
                setTime(reservation.rezevrTimeStart);
                setEndTime(reservation.rezevrTimeEnd);
            } catch (error) {
                console.error("Failed to fetch reservation data:", error);
            }
        };

        fetchReservation();
    }, [id]);

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
        if (!address) {
            alert('Please select a valid address');
            return;
        }
        const calculateEndTime = (startTime) => {
            const [hours, minutes] = startTime.split(':').map(Number);
            const endTime = new Date();
            endTime.setHours(hours + 1);
            endTime.setMinutes(minutes);

            return `${String(endTime.getHours()).padStart(2, '0')}:${String(endTime.getMinutes()).padStart(2, '0')}`;
        };

        const endTime = calculateEndTime(time);

        const updatedReservation = {
            reservationRequest: {
                Address: address || "Default Address",
                RoomNumber: parseInt(roomNumber),
                PeopleNumber: parseInt(peopleNumber),
                GameId: parseInt(gameId),
                UserId: 1, // Assuming a fixed UserId for now
                Date: date,
                StartTime: `${time}`, // Ensure it's in HH:MM:SS format
                EndTime: `${endTime}:00`, // Ensure it's in HH:MM:SS format
            }
        };
        console.log("Selected address:", address);
        console.log("Sending reservation data:", updatedReservation);

        try {
            navigate('/GetReservations'); // Redirect after login
            await updateReservation(id, updatedReservation);  // Ensure correct data is sent to backend
            console.log("Reservation updated successfully");
        } catch (error) {
            console.error("Error updating reservation:", error);
        }
    };



    return (
        <div id="content">
            <div id="contentRight">
                <section className="reservation-section">
                    <h2>Rezervuoti Kambarius</h2>

                    <form onSubmit={handleSubmit} className="reservation-form">
                        {/* Address Input */}
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
                                <option value="test">test</option>
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

                        {/* Room Number Input */}
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

                        {/* People Number Input */}
                        <div className="form-group">
                            <label htmlFor="peopleNumber">People Number:</label>
                            <input
                                type="number"
                                id="peopleNumber"
                                value={peopleNumber}
                                onChange={(e) => setPeopleNumber(e.target.value)}
                                required
                            />
                        </div>

                        {/* Game ID Input */}
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

                        {/* Date Input */}
                        <div className="form-group">
                            <label htmlFor="date">Date:</label>
                            <input
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                required
                            />
                        </div>

                        {/* Start Time Input */}
                        <div className="form-group">
                            <label htmlFor="time">Start Time:</label>
                            <input
                                type="time"
                                id="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                required
                            />
                        </div>

                        {/* End Time Input */}
                        <div className="form-group">
                            <label htmlFor="endTime">End Time:</label>
                            <input
                                type="time"
                                id="endTime"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="form-group">
                            <button type="submit">Update Reservation</button>
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default EditReservation;
