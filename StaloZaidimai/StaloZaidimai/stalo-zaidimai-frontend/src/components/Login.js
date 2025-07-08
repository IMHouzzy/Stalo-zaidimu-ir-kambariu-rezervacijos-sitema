import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/apiService';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        const credentials = { Username: username, Password: password };

        // Atspausdiname username ir password
        console.log("Frontend username:", username);
        console.log("Frontend password:", password);

        try {
            const response = await loginUser(credentials);

            if (response && response.token) {
                localStorage.setItem('authToken', response.token);

                // Išsaugome rolę (jei yra)
                const decodedToken = decodeJwtToken(response.token);


                navigate('/'); // Redirect after login
            } else {
                setErrorMessage('Netinkamas prisijungimo vardas arba slaptažodis.');
            }
        } catch (error) {
            setErrorMessage('Prisijungimas nepavyko. Patikrinkite duomenis.');
        }
    };



    const decodeJwtToken = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        // Dekoduotas tokenas
        const decoded = JSON.parse(jsonPayload);
        console.log("Decoded JWT:", decoded);  // Patikrinkite visą dekoduotą objektą

        // Paimkite rolę iš teisingo claim
        const userRole = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || 'Unknown';
        console.log("Frontend user role:", userRole);

        return decoded;
    };





    return (
        <div id="content">
            <div id="contentRight">
                <section className="registration-section">
                    <h2 id="registration-title">Prisijungimas</h2>
                    <form className="registration-form" onSubmit={handleSubmit}>
                        <div className="registration-group">
                            <label>Vartotojo vardas:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="registration-group">
                            <label>Slaptažodis:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                        <button type="submit">Prisijungti</button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Login;
