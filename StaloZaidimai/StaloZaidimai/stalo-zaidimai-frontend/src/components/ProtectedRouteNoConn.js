import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children, requiredRole }) => {
    const token = localStorage.getItem('authToken');

    // Jei nėra token'o, nukreipiame į prisijungimo puslapį
    if (!token) {
        return <Navigate to="/login" />;
    }

    // Jei yra reikalaujama rolė, patikriname ją
    if (requiredRole) {
        let userRole = null;
        try {
            const decodedToken = jwtDecode(token);
            userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        } catch (error) {
            console.error('Nepavyko dekoduoti tokeno:', error);
        }

        // Jei rolė neteisinga, nukreipiame į prisijungimo puslapį
        if (userRole !== requiredRole) {
            return <Navigate to="/login" />;
        }
    }

    return children;  // Jei nėra klaidų, rodomas puslapis
};

export default ProtectedRoute;