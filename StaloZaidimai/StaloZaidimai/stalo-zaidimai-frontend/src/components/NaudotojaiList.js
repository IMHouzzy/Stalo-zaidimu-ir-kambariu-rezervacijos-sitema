import React, { useEffect, useState } from 'react';
import { getData } from '../api/apiService';  // Adjust path if needed

const NaudotojaiList = () => {
    const [naudotojai, setNaudotojai] = useState([]);
    const [loading, setLoading] = useState(true);  // Track loading state
    const [error, setError] = useState(null);      // Track error state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getData();
                console.log('Data fetched:', data);  // Log fetched data
                setNaudotojai(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);  // Capture error message
            } finally {
                setLoading(false);  // Set loading to false after fetch completes
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;  // Display error message if any

    return (
        <div>
            <h1>Naudotojai List</h1>
            {naudotojai.length ? (
                <ul>
                    {naudotojai.map((item) => (
                        <li key={item.id_StaloZaidimas}> {/* Assuming each person has a unique 'id' */}
                            <h1>Pavadinimas: {item.name}</h1> {/* Displaying email */}
                            <h4>Kaina: {item.price}</h4>
                            <h4>Aprašas: {item.description}</h4>
                            <h4>Rekomenduojamas amžius: {item.alowedAge}</h4>
                            <img src={item.image} style={{ width: '100px' }} alt={`${item.name} image`} />
                            {/* Add more fields as necessary */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No data available.</p>
            )}
        </div>
    );
};

export default NaudotojaiList;
